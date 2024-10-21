// GetBalance.ts
import { useBalance } from 'wagmi';
import { ethers } from 'ethers';

const useTokenBalance = (contract_meme: `0x${string}`, AccountAddress: `0x${string}`, decimals: number) => {
    const { data: balanceData, isError, isLoading } = useBalance({
        address: AccountAddress,
        token: contract_meme,
    });

    const formattedBalance = balanceData ? ethers.formatUnits(balanceData.value.toString(), decimals) : "0";

    return {
        balance: formattedBalance,
        isError,
        isLoading,
    };
};

export default useTokenBalance;
