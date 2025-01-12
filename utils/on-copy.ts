import toast from 'react-hot-toast';

export const onCopy = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success('Copiado para a área de transferência!');
};
