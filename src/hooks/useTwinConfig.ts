import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export function useTwinConfig(user: User | null) {
  const [dairyReductionPercent, setDairyReductionPercent] = useState<number>(20);
  const [altAdoptionPercent, setAltAdoptionPercent] = useState<number>(30);
  const [energyTransitionActive, setEnergyTransitionActive] = useState<boolean>(false);

  // Auto-save twin config changes (debounced)
  useEffect(() => {
    if (!user) return;
    const delayDebounce = setTimeout(async () => {
      try {
        await setDoc(doc(db, "users", user.uid, "configs", "twin"), {
          dairyReductionPercent,
          altAdoptionPercent,
          energyTransitionActive
        });
      } catch (err) {
        console.error("Error auto-saving twin configuration:", err);
      }
    }, 800); // 800ms debounce

    return () => clearTimeout(delayDebounce);
  }, [user, dairyReductionPercent, altAdoptionPercent, energyTransitionActive]);

  return {
    dairyReductionPercent,
    setDairyReductionPercent,
    altAdoptionPercent,
    setAltAdoptionPercent,
    energyTransitionActive,
    setEnergyTransitionActive
  };
}
