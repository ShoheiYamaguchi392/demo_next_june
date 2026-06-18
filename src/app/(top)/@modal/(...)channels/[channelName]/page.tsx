"use client";

import Modal from "@/components/common/Modal/Modal";
import { useRouter } from "next/navigation";

const ChannelDetail = () => {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  return <Modal onClose={handleClose}>modal detail</Modal>;
};

export default ChannelDetail;
