import { getBranchs } from "../axios/branch";
import { listBranch } from "../stores/Branch/ListBranch";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
export const useBranch = () => {
  const [branch, setBranch] = useRecoilState(listBranch);
  useEffect(() => {
    getBranch();
  }, []);
  const getBranch = async () => {
    await getBranchs()
      .then((res) => {
        setBranch(res.data);
      })
      .catch((err) => console.log(err));
  };
  return { branch, getBranch };
};
