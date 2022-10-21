import React from "react";
import BasicTable from "../BasicTable";
import { TableCell, TableRow } from "@mui/material";

export const SmallParcel = () => {
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
            东马－海运小包(全抛)双清包税包送到门专线
            <br />
            全抛计重方式：计费重量：实重和体积重量取较大值，长*宽*高CM/6000。
            <br />
            长/宽/高单边超过1.5米，单件重量超过50kg,需要加收超长超重费150元一票；超过2米 或者单件超过1.5吨目的港派送费需另外确认！
            <br />
            （注：超大超重货物，若需请叉车上货卸货，具体费用实报实销）
            <br />
            马来已含税费，无税单提供
            <br />
            <b>东马－海运小包J&T(含税)</b>
            15-20个工作日
            <br />
            周三截货，一周一船
            <br />
            <BasicTable
                tableHeader={tableHeader}
                tableCell={renderTableCell}
                tableData={smParcelData}
            />
        </React.Fragment>
    )
}