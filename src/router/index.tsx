import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index/index";
import AddOrEdit from "@/pages/AddOrEdit/index";
import { ConfigProvider } from "@douyinfe/semi-ui"
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';
export default function Router() {
    return (
        <ConfigProvider locale={en_GB}>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="update" element={<AddOrEdit />} />
            </Routes>
        </ConfigProvider>

    )
}
