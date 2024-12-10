import prisma from "../../../shared/prisma";

const saveRecentProduct = async (user: any, payload: string[]) => {
  const { id, email } = user;

  const recentProductsData = payload.map((productId) => ({
    userId: id,
    productId,
    visitedAt: new Date(),
  }));

  console.log("recentProductsData", recentProductsData);

  const savedData = await prisma.recentProduct.createMany({
    data: recentProductsData,
    skipDuplicates: true,
  });

  console.log("saved data", savedData);

  return;
};
const getRecentProduct = async (user: any) => {
  const { id: userId } = user;

  const recentProducts = await prisma.recentProduct.findMany({
    where: {
      userId,
    },
    orderBy: {
      visitedAt: "desc",
    },
    take: 10,
  });

  console.log("recentProducts", recentProducts);

  return recentProducts;
};

export const RecentProductServices = {
  saveRecentProduct,
  getRecentProduct,
};
