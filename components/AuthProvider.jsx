"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { ensureUserProfile } from "@/lib/auth";

export const AuthContext = createContext({
  user: null,
  userProfile: null,
  loading: true,
  logout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          // 1. Setelah pengguna berhasil masuk dengan cara apa pun:
          // Cek dokumen users/{uid}. Bila belum ada, buat dokumen sesuai PRD 7.1 dan role "siswa".
          // Bila sudah ada, jangan diubah sama sekali agar data tidak tertimpa.
          await ensureUserProfile(currentUser);

          // 2. Baca dokumen users/{uid} secara langsung & real-time dari Cloud Firestore
          const userDocRef = doc(db, "users", currentUser.uid);

          if (unsubscribeProfile) {
            unsubscribeProfile();
          }

          unsubscribeProfile = onSnapshot(
            userDocRef,
            (snapshot) => {
              if (snapshot.exists()) {
                setUserProfile({
                  id: snapshot.id,
                  ...snapshot.data(),
                });
              } else {
                setUserProfile(null);
              }
              setLoading(false);
            },
            (error) => {
              console.warn("Firestore onSnapshot error:", error);
              // Fallback jika onSnapshot terkendala
              getDoc(userDocRef)
                .then((snap) => {
                  if (snap.exists()) {
                    setUserProfile({ id: snap.id, ...snap.data() });
                  }
                })
                .catch((e) => console.warn("Fallback getDoc notice:", e))
                .finally(() => setLoading(false));
            }
          );
        } catch (err) {
          console.warn("Auth sync profile notice:", err);
          setLoading(false);
        }
      } else {
        if (unsubscribeProfile) {
          unsubscribeProfile();
          unsubscribeProfile = null;
        }
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
    };
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
