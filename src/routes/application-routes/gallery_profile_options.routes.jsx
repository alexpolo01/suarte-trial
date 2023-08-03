import Inventory from "@/layouts/navigation/components/Inventory";
import InventoryAvailable from "@/pages/gallery-profile-options/inventory-available";
import InventoryPending from "@/pages/gallery-profile-options/inventory-pending";
import InventorySold from "@/pages/gallery-profile-options/inventory-sold";
import Invoices from "@/pages/gallery-profile-options/invoices";
import Referrals from "@/pages/gallery-profile-options/referrals";

const GalleryProfileOptions = [
  { path: "/profile/invoices", element: <Invoices/> },
  { path: "/profile/referrals", element: <Referrals/> },
  {
    element: <Inventory/>,
    children: [
      { path: "/inventory/available", element: <InventoryAvailable/> },
      { path: "/inventory/pending", element: <InventoryPending/> },
      { path: "/inventory/sold", element: <InventorySold/> },
    ]
  }
];

export default GalleryProfileOptions;