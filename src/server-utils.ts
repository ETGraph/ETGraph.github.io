import * as jose from "jose";

const key = new TextEncoder().encode(
  import.meta.env.JWT_KEY,
);

export const generateJWT = async (signerAddress: string) => {
  const jwt = await new jose.SignJWT({
    signerAddress,
    isAdmin: true,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("etgraph.deno.dev")
    .setExpirationTime("1h")
    .sign(key);
  return jwt;
};

export const verifyJWT = async (jwt: string) => {
  const verified = await jose.jwtVerify(jwt, key, {
    issuer: "etgraph.deno.dev",
  });
  return verified;
};
