export async function generateSecureToken({
  ethAddress,
  blockchains,
}: {
  ethAddress: string;
  blockchains?: string[];
}): Promise<string> {
  try {
    console.log("generateSecureToken",ethAddress, blockchains);

    // Cambia la URL a la del servidor backend real
    const response = await fetch("http://localhost:3000/api/secure-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ethAddress, blockchains }),
    });

    if (!response.ok) {
      console.log(await response.text());
      throw new Error(
        "Failed to fetch secure token: ensure valid inputs, crypto wallet matches network, and secure connection"
      );
    }

    const json = await response.json();
    return json.token;
  } catch (error) {
    throw error;
  }
}
