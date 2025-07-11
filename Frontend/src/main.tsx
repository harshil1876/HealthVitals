import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react';

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey="pk_test_aHVtYW5lLWdyYWNrbGUtODQuY2xlcmsuYWNjb3VudHMuZGV2JA">
    <App />
  </ClerkProvider>
);
