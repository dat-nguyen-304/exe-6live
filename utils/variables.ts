import { GiClothes, GiCheckeredDiamond } from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { SiTiktok, SiShopee } from "react-icons/si";

export const genders = [
  {
    label: "Tất cả giới tính",
    value: "all",
  },
  {
    label: "Nam",
    value: "male",
  },
  {
    label: "Nữ",
    value: "female",
  },
  {
    label: "LGBT",
    value: "lgbt",
  },
];

export const industries = [
  {
    label: "Tất cả ngành",
    icon: null,
    value: "all",
  },
  {
    label: "Thức ăn",
    icon: IoFastFoodOutline,
    value: "food",
  },
  {
    label: "Quần áo",
    icon: GiClothes,
    value: "clothes",
  },
  {
    label: "Mỹ phẩm",
    icon: GiCheckeredDiamond,
    value: "cosmetology",
  },
  {
    label: "Phụ kiện",
    icon: IoDiamond,
    value: "accessory",
  },
];

export const locations = [
  {
    label: "Tất cả địa điểm",
    value: "all",
  },
  {
    label: "TP. Hồ Chí Minh",
    value: "hcm",
  },
  {
    label: "TP. Đà Nẵng",
    value: "dn",
  },
  {
    label: "TP. Hà Nội",
    value: "hn",
  },
];

export const platforms = [
  {
    label: "Tất cả nền tảng",
    value: "all",
    icon: null,
  },
  {
    label: "Facebook",
    value: "facebook",
    icon: FaFacebookSquare,
  },
  {
    label: "Youtube",
    value: "youtube",
    icon: FaYoutube,
  },
  {
    label: "Tiktok",
    value: "tiktok",
    icon: SiTiktok,
  },
  {
    label: "Instagram",
    value: "instagram",
    icon: AiFillInstagram,
  },
  {
    label: "Shopee",
    value: "shopee",
    icon: SiShopee,
  },
];
