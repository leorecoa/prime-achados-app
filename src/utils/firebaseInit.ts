import { ref, get, set } from 'firebase/database';
import { database } from '../integrations/firebase/client';

export async function initializeFirebaseData() {
  const checkAndInit = async (path: string, initialData: object) => {
    const snapshot = await get(ref(database, path));
    if (!snapshot.exists()) {
      await set(ref(database, path), initialData);
    }
  };

  try {
    await Promise.all([
      checkAndInit('dailyDeals/initial', {
        title: "Oferta Inicial",
        discount: 20,
        timestamp: Date.now()
      }),
      checkAndInit('banners/initial', {
        title: "Banner Inicial",
        imageUrl: "https://exemplo.com/imagem.jpg"
      })
    ]);
    return true;
  } catch (error) {
    console.error("Erro na inicialização:", error);
    return false;
  }
}