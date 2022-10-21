import React from "react";
import BasicTable from "../BasicTable";
import { TableCell, TableRow } from "@mui/material";

export const SelfCollect = () => {
    const [tableHeader, setTableHeader] = React.useState(["重量", "首重"]);
    const [kchData, setKchData] = React.useState([
        { condition: "单件0.013m³及以下", price: "RM 5/0.013m³" },
        { condition: "单件0.013m³及以上", price: "RM 480/1m³" }
    ]);
    const [saData, setSaData] = React.useState([
        { condition: "单件0.013m³及以下", price: "RM 6/0.013m³" },
        { condition: "单件0.013m³及以上", price: "RM 520/1m³" }
    ]);

    const renderTableCell = (data) => {
        return (
            <React.Fragment>
                {data.map((row) => (

                    <TableRow
                        key={row.condition}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.condition}
                        </TableCell>
                        <TableCell>{row.price}</TableCell>
                    </TableRow>
                ))}
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <div
                style={{
                    borderColor: 'black',
                    borderStyle: 'solid',
                    borderWidth: '0 0 0 10px',
                    paddingLeft: '10px',
                    boxShadow: '0px 10px 45px 10px rgba(22,22,22,0.1)',
                    borderRadius: '5px',
                    padding: '10px',
                }}
            >
                东马－大货海运(计立方)双清包税包送到门专线
                <br />
                立方计算方式：长*宽*高CM/1000000=m³(CBM)
                1m³=500KG
                <br />
                以下海运报价为普通货物，敏感货物。
                拒收粉末、液体、香烟、药品、酒类等违禁品。
                <br />
                马来已含税费，无税单提供
                马来西亚（东马） 每周二至六装柜.到门时间的16－25天
                <br />
                <b>派送细则</b>
                <ul>
                    <li>派送只提供送货到门服务，不提供装卸服务。</li>
                    <li>若遇超重的货物，目的港收货人应自备工具，若未备应有的工具，请事先告知我们公司，且额外产生卸货的费用由客人来承担</li>
                    <li>不派送展览馆的货物，如客户要求派送，必须提前确定派送时间，并加收拖车费用</li>
                    <li>目的港送货之地点，若遇客户为无电梯者，司机之搬运费用另计</li>
                </ul>
            </div>
            <br />
            <b>东马 (古晋自取)</b>
            <br />
            马来已含税费，无税单提供
            <br />
            时效21－25天
            <br />
            备注：
            <ul>
                <li>单个包裹体积小过 0.013 m³ 算 RM 5</li>
                <li>运费根据单个柜子货物总体积计算</li>
                <li>所有货物的重量是 100 公斤以上或人工不能搬为标准，过重的货客户自行付费 (如租叉车/吊车)</li>
                <li>
                    1 立方不可以超过 500 kg， 如果超过将已重量 / 500 计算立方
                    <br />
                    Eg: 货物重量 ： 1000 kg, 货物立方 ： 0.5 m³
                    <br />
                    货物重量体积 ： 1000 / 500 = 2 m³ (将会以 2 m³ 计算运费)
                </li>
                <li>此价钱为自取价格，派送将根据地区额外收费，全部地区物流只送到楼下</li>
            </ul>
            <br />
            <BasicTable
                tableHeader={tableHeader}
                tableCell={renderTableCell}
                tableData={kchData}
            />
            <br />
            <b>东马 (斯里阿曼自提)</b>
            <br />
            马来已含税费，无税单提供
            <br />
            时效21－25天
            <br />
            备注：
            <ul>
                <li>单个包裹体积小过 0.013 m³ 算 RM 6</li>
                <li>运费根据单个柜子货物总体积计算</li>
                <li>所有货物的重量是 100 公斤以上或人工不能搬为标准，过重的货客户自行付费 (如租叉车/吊车)</li>
                <li>
                    1 立方不可以超过 500 kg， 如果超过将已重量 / 500 计算立方
                    <br />
                    Eg: 货物重量 ： 1000 kg, 货物立方 ： 0.5 m³
                    <br />
                    货物重量体积 ： 1000 / 500 = 2 m³ (将会以 2 m³ 计算运费)
                </li>
                <li>此价钱为自取价格，派送将根据地区额外收费，全部地区物流只送到楼下</li>
            </ul>
            <br />
            <BasicTable
                tableHeader={tableHeader}
                tableCell={renderTableCell}
                tableData={saData}
            />
        </React.Fragment>
    )
}