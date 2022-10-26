import React from "react";
import BasicTable from "../BasicTable";
import { TableCell, TableRow } from "@mui/material";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export const TempSelfCollect = () => {
    const [tableHeader, setTableHeader] = React.useState(["重量", "首重"]);
    const [kchData, setKchData] = React.useState([
        { condition: "单件0.013m³及以下", price: "RM 5/0.013m³" },
        { condition: "单件0.013m³及以上", price: "RM 480/1m³" }
    ]);
    const [saData, setSaData] = React.useState([
        { condition: "单件0.013m³及以下", price: "RM 6/0.013m³" },
        { condition: "单件0.013m³及以上", price: "RM 520/1m³" }
    ]);

    const header = [
        "", "单个货物体制", "计算方式", "古晋自提运费",
    ]
    const data = [
        { item1: "大于 0.01m³", item2: "单个包裹立方体积计算", item3: "RM380/立方 (m³)" },
        { item1: "大于 500kg", item2: "单个包裹实重体积计算", item3: "RM380/立方 (m³)" },
        { item1: "小于 0.01m³", item2: "单个小包裹计算", item3: "RM4/件" },
    ]
    const layoutStyle = { fontSize: "11pt", letterSpacing: 2 }
    return (
        <React.Fragment>
            <div
                style={{
                    borderColor: '#023047',
                    borderStyle: 'solid',
                    borderWidth: '0 0 0 10px',
                    paddingLeft: '10px',
                    boxShadow: '0px 10px 45px 10px rgba(22,22,22,0.1)',
                    borderRadius: '5px',
                    padding: '10px',
                }}
            >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-Typography="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={4} style={{ textAlign: "center", fontWeight: "600", padding: "8pt", fontSize: "14pt", letterSpacing: 2, backgroundColor: "#023047", color: "white" }}>古晋自取收费</TableCell>
                            </TableRow>
                            <TableRow>
                                {header.map((header) => (
                                    <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12pt", padding: "6pt", letterSpacing: 2 }} sx={{ borderRight: 1, borderRightColor: "#e0e0e0" }} >{header}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((tablecell, index) => (

                                <TableRow >
                                    {
                                        index === 0 &&
                                        <TableCell sx={{ borderRight: 1, borderRightColor: "#e0e0e0" }} rowSpan={3} align="center" style={{ fontWeight: "600" ,letterSpacing: 2}}>
                                            海运收费
                                        </TableCell>
                                    }
                                    <TableCell align="center" sx={{ borderRight: 1, borderRightColor: "#e0e0e0" ,letterSpacing: 2}} >{tablecell.item1}</TableCell>
                                    <TableCell align="center" sx={{ borderRight: 1, borderRightColor: "#e0e0e0" ,letterSpacing: 2}} >{tablecell.item2}</TableCell>
                                    <TableCell align="center" sx={{ borderRight: 1, borderRightColor: "#e0e0e0" ,letterSpacing: 2}} >{tablecell.item3}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableBody >
                            <TableCell align="center" sx={{ borderRight: 1, borderRightColor: "#e0e0e0" }} style={{ fontWeight: "600" }}>时效</TableCell>
                            <TableCell colSpan={3} style={{ textAlign: "center", letterSpacing: 2 }}>21-25 工作日</TableCell>
                        </TableBody>
                        <TableBody >
                            <TableCell align="center" sx={{ borderRight: 1, borderRightColor: "#e0e0e0" }} style={{ fontWeight: "600" }}>时效</TableCell>
                            <TableCell colSpan={3} style={{ textAlign: "center", letterSpacing: 2 }}>包税包清关</TableCell>
                        </TableBody>
                        <TableBody >
                            <TableCell align="center" sx={{ borderRight: 1, borderRightColor: "#e0e0e0" }} style={{ fontWeight: "600" }}>清关</TableCell>
                            <TableCell colSpan={3} style={{ textAlign: "center", letterSpacing: 2 }}>派送服务收费会以派送地点为准，收费服务只送到楼下门口，不包括搬上楼或搬进屋</TableCell>
                        </TableBody>
                        <TableBody >
                            <TableCell align="center" sx={{ borderRight: 1, borderRightColor: "#e0e0e0" }} style={{ fontWeight: "600" }}>派送服务</TableCell>
                            <TableCell colSpan={3} style={{ textAlign: "center" }}>
                                <Typography style={layoutStyle}>易碎易漏物品建议打木架，</Typography>
                                <Typography style={layoutStyle}>木架服务收费将会以货物体制为标准，最低消费为 100元.</Typography>
                            </TableCell>
                        </TableBody>
                        <TableBody >
                            <TableCell align="center" sx={{ borderRight: 1, borderRightColor: "#e0e0e0" }} style={{ fontWeight: "600" }}>叉车收费</TableCell>
                            <TableCell colSpan={3} style={{ textAlign: "center" }}>
                                <Typography style={layoutStyle}>单件货物若特别重，仓库人员无法搬运则需要租借叉车,</Typography>
                                <Typography style={layoutStyle}>会征收额外叉车费，叉车费将因货物体质而异，最低为 RM100.</Typography>
                            </TableCell>
                        </TableBody>
                        <TableBody >
                            <TableCell align="center" sx={{ borderRight: 1, borderRightColor: "#e0e0e0" }} style={{ fontWeight: "600" }}>立方计算</TableCell>
                            <TableCell colSpan={3} style={{ textAlign: "center" }}>
                                <Typography style={layoutStyle}>立方计算方式： 长(m) X 高(m) X 宽(m)</Typography>
                                <Typography style={layoutStyle}><strong>例子：</strong> 0.56m X 0.35m X 1.08m = 1.222m³</Typography>
                            </TableCell>
                        </TableBody>
                        <TableBody >
                            <TableCell align="center" sx={{ borderRight: 1, borderRightColor: "#e0e0e0" }} style={{ fontWeight: "600" }}>违禁物品</TableCell>
                            <TableCell colSpan={3} style={{ textAlign: "center" }}>
                                <Typography style={layoutStyle}>烟草，易爆易燃物体，危险物品，动物，烟草，毒品，空调冷媒，酒类，植物，充电宝，电动车, 锂电池，高压气瓶</Typography>
                                <Typography style={layoutStyle}>若违规运输违禁品造成货物被海关充公，公司将不会赔偿, 需自行负上法律责任以及缴付罚款，请知悉</Typography>
                            </TableCell>
                        </TableBody>
                        <TableBody >
                            <TableCell align="center" sx={{ borderRight: 1, borderRightColor: "#e0e0e0" }} style={{ fontWeight: "600", }}>重量限制</TableCell>
                            <TableCell colSpan={3} style={{ textAlign: "center" }}>
                                <Typography style={layoutStyle}>每立方 (m³) 的重量不可超过 500kg， 超重包裹的收费体积按 实重/500kg 计算</Typography>
                                <Typography style={layoutStyle}><strong>例子：</strong> 800kg / 500kg = 1.6m3, 收费按 1.6m3 计算</Typography>
                            </TableCell>
                        </TableBody>
                        <TableBody >
                            <TableCell colSpan={4} style={{ textAlign: "center", padding: "5pt" }}>
                                <Typography style={layoutStyle}><strong>运费更新于 23.10.2022</strong></Typography>
                            </TableCell>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </React.Fragment>
    )
}