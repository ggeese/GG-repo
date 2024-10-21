import { useWaitForTransactionReceipt } from 'wagmi';

function useTransactionStatus(transactionHash) {
  const { data, isError, isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: transactionHash,
    confirmations: 10, 
  });
  // Devolver el estado relacionado con la transacción
  return {
    data,
    isError,
    isLoading,
    isSuccess,
  };
}

export default useTransactionStatus;
