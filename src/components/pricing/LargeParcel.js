import React from "react";
import BasicTable from "../BasicTable";
import { TableCell, TableRow } from "@mui/material";

export const LargeParcel = () => {
    const [tableHeader, setTableHeader] = React.useState(["重量", "首重"]);
    const [smParcelData, setSmParcelData] = React.useState([
        { condition: "1 - 30 kg", price: "RM 10/1Kg" },
        { condition: "30 kg+", price: "RM 9/1Kg³" }
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
            东马－大货海运(计立方)双清包税包送到门专线
            <br />
            立方计算方式：长*宽*高CM/1000000=m³(CBM)
            <br />
            1m³=500KG
            <br />
            以下海运报价为普通货物，敏感货物。
            <br />
            拒收粉末、液体、香烟、药品、酒类等违禁品。
            <br />
            马来已含税费，无税单提供
            <br />
            马来西亚（东马） 每周二至六装柜.到门时间的16－25天
            <br />
            派送细则
            <ul>
                <li>派送只提供送货到门服务，不提供装卸服务。</li>
                <li>若遇超重的货物，目的港收货人应自备工具，若未备应有的工具，请事先告知我们公司，且额外产生卸货的费用由客人来承担</li>
                <li>不派送展览馆的货物，如客户要求派送，必须提前确定派送时间，并加收拖车费用</li>
                <li>目的港送货之地点，若遇客户为无电梯者，司机之搬运费用另计</li>
            </ul>
            <BasicTable
                tableHeader={tableHeader}
                tableCell={renderTableCell}
                tableData={smParcelData}
            />
        </React.Fragment>
    )
}