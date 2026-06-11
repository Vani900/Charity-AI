// Mock API Layer for Donor functionality
// Simulates network latency and returns valid responses to ensure frontend robustness.

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getNearbyNgos = async (lat: number, lng: number) => {
  await delay(800);
  return {
    data: {
      success: true,
      data: [
        { _id: '1', name: 'Chennai Food Bank', distance: 800, ngoDetails: { causes: ['Food'] }, location: { coordinates: [80.2707, 13.0827] } },
        { _id: '2', name: 'Blood Connect', distance: 1200, ngoDetails: { causes: ['Blood'] }, location: { coordinates: [80.2720, 13.0840] } },
        { _id: '3', name: 'ClothesForAll', distance: 2100, ngoDetails: { causes: ['Clothes'] }, location: { coordinates: [80.2680, 13.0800] } },
      ]
    }
  };
};

export const createDonation = async (data: any) => {
  await delay(1000);
  return { data: { success: true, message: "Donation successful", id: Math.random().toString(36).substring(7) } };
};

export const getMyDonations = async (page = 1, limit = 10) => {
  await delay(800);
  return {
    data: {
      success: true,
      data: [
        { _id: '101', category: 'Food', status: 'completed', date: new Date().toISOString(), quantity: '20 meals' },
        { _id: '102', category: 'Clothes', status: 'pending', date: new Date().toISOString(), quantity: '5 boxes' },
      ]
    }
  };
};

export const getDonationTracking = async (id: string) => {
  await delay(500);
  return {
    data: {
      success: true,
      data: {
        id,
        status: 'in-transit',
        driver: { name: 'Ramesh', phone: '9876543210' },
        eta: '15 mins'
      }
    }
  };
};

export const getAiMatch = async (items: string, lat?: number, lng?: number) => {
  await delay(1200);
  return {
    data: {
      success: true,
      data: [
        { _id: '1', name: 'Chennai Food Bank', matchScore: 98, distance: 800 },
        { _id: '2', name: 'ClothesForAll', matchScore: 75, distance: 2100 },
      ]
    }
  };
};
