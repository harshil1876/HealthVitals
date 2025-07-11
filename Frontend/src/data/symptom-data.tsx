import type {
  BodyArea,
  Doctor,
  DummyConditions,
  MedicalArticle,
} from "../types/symptom-types";

// Body areas and associated symptoms
export const bodyAreas: BodyArea[] = [
  {
    id: "head",
    name: "Head & Face",
    symptoms: [
      "Headache",
      "Facial pain",
      "Dizziness",
      "Sinus pressure",
      "Eye pain",
    ],
  },
  {
    id: "respiratory",
    name: "Respiratory System",
    symptoms: [
      "Cough",
      "Shortness of breath",
      "Sore throat",
      "Runny nose",
      "Congestion",
      "Sneezing",
    ],
  },
  {
    id: "digestive",
    name: "Digestive System",
    symptoms: [
      "Nausea",
      "Vomiting",
      "Diarrhea",
      "Constipation",
      "Abdominal pain",
      "Heartburn",
    ],
  },
  {
    id: "musculoskeletal",
    name: "Muscles & Joints",
    symptoms: [
      "Joint pain",
      "Muscle aches",
      "Stiffness",
      "Back pain",
      "Weakness",
    ],
  },
  {
    id: "skin",
    name: "Skin",
    symptoms: ["Rash", "Itching", "Hives", "Discoloration", "Dryness"],
  },
  {
    id: "general",
    name: "General",
    symptoms: ["Fever", "Fatigue", "Chills", "Night sweats", "Weight changes"],
  },
];

// Dummy data for the enhanced demo
export const dummyConditions: DummyConditions = {
  respiratory: [
    {
      name: "Common Cold",
      description: "A viral infection of the upper respiratory tract.",
      symptoms: ["Runny nose", "Sore throat", "Cough", "Mild fever"],
      urgency: "low",
      treatmentOptions: [
        "Rest and hydration",
        "Over-the-counter cold medications",
        "Saline nasal spray",
      ],
      recoveryTime: "7-10 days",
      preventionTips: [
        "Frequent handwashing",
        "Avoid close contact with sick individuals",
        "Maintain good immune health",
      ],
    },
    // ... (other respiratory conditions)
  ],
  digestive: [
    {
      name: "Gastroenteritis",
      description: "Inflammation of the stomach and intestines.",
      symptoms: ["Nausea", "Vomiting", "Diarrhea", "Abdominal cramps"],
      urgency: "medium",
      treatmentOptions: [
        "Hydration",
        "BRAT diet (Bananas, Rice, Applesauce, Toast)",
        "Rest",
      ],
      recoveryTime: "1-3 days",
      preventionTips: [
        "Proper food handling",
        "Frequent handwashing",
        "Avoid contaminated food and water",
      ],
    },
    // ... (other digestive conditions)
  ],
  neurological: [
    {
      name: "Tension Headache",
      description: "Common headache with mild to moderate pain.",
      symptoms: [
        "Dull, aching head pain",
        "Tightness around forehead",
        "Tenderness in scalp",
      ],
      urgency: "low",
      treatmentOptions: [
        "Over-the-counter pain relievers",
        "Stress management",
        "Rest",
      ],
      recoveryTime: "30 minutes to several hours",
      preventionTips: [
        "Regular exercise",
        "Adequate sleep",
        "Stress reduction techniques",
      ],
    },
    // ... (other neurological conditions)
  ],
};

export const nearbyDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "General Practitioner",
    distance: "0.8 miles",
    availability: "Today",
    rating: 4.8,
    image: "/placeholder.svg?height=80&width=80",
    address: "123 Medical Center Dr, Suite 101",
    phone: "(555) 123-4567",
  },
  // ... (other doctors)
];

export const medicalArticles: MedicalArticle[] = [
  {
    id: 1,
    title: "Understanding Common Cold Symptoms",
    excerpt: "A brief overview of symptoms and treatments for the common cold.",
    source: "Health Journal",
    date: "2023-01-15",
    url: "https://example.com/common-cold",
  },
  // ... (other articles)
];

export const durationOptions = [
  { value: "1-3 days", label: "1-3 days" },
  { value: "4-7 days", label: "4-7 days" },
  { value: "1-2 weeks", label: "1-2 weeks" },
  { value: "2+ weeks", label: "2+ weeks" },
];

export const medicalHistoryOptions = [
  "Diabetes",
  "Hypertension",
  "Asthma",
  "Heart Disease",
  "Thyroid Disorder",
  "Kidney Disease",
  "Liver Disease",
  "Cancer",
  "Arthritis",
  "Depression",
  "Anxiety",
  "Other",
]; 