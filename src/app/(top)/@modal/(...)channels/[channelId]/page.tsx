"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/common/Modal/Modal";
import ChannelDetail from "@/components/pages/ChannelDetail/ChannelDetail";

const ChannelDetailPage = (): React.ReactNode => {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <ChannelDetail />
    </Modal>
  );
};

export default ChannelDetailPage;
