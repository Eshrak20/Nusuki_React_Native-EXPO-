import type { CabinClass } from "../types/flight/types.flight";

export const mapCabinCodeToLabel = (code: CabinClass | string) => {
  const mapping: Record<string, string> = {
    Y: "Economy",
    S: "Premium Economy",
    C: "Business Class",
    F: "First Class",
  };

  return mapping[code] || "Economy";
};

export const mapCabinLabelToCode = (label: string): CabinClass => {
  const mapping: Record<string, CabinClass> = {
    Economy: "Y",
    "Premium Economy": "S",
    "Business Class": "C",
    "First Class": "F",
  };

  return mapping[label] || "Y";
};