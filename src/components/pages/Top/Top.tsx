"use client";

import BasicLayout from "@/components/layouts/HeaderLayout/BasicLayout";

import useTop from "./useTop";

const Top = () => {
  useTop();

  return (
    <BasicLayout>
      <div>content</div>
    </BasicLayout>
  );
};

export default Top;
