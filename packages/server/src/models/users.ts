import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export async function exists(username: string): Promise<boolean> {
  const normalizedUsername = normalize(username);
  const userCount = await prisma.user.count({
    where: {
      normalizedUsername,
    },
  });

  return userCount > 0;
}

export async function get(username: string): Promise<User | null> {
  const normalizedUsername = normalize(username);
  const user = prisma.user.findFirst({
    where: {
      normalizedUsername,
    },
  });

  return user;
}

export async function create(
  username: string,
  passwordHash: string,
  ip: string,
): Promise<User> {
  const normalizedUsername = normalize(username);
  const user = await prisma.user.create({
    data: {
      username,
      normalizedUsername,
      passwordHash,
      lastIP: ip,
    },
  });

  return user;
}

export async function setIP(username: string, ip: string): Promise<void> {
  const normalizedUsername = normalize(username);
  await prisma.user.update({
    where: {
      normalizedUsername,
    },
    data: {
      lastIP: ip,
    },
  });
}

function normalize(username: string) {
  return username.toLowerCase();
}
