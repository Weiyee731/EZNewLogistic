import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import InfoIcon from '@mui/icons-material/Info';
import { Card, CardContent, Typography, Grid, Tabs, Tab, Box } from '@mui/material';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

export const FAQpage = () => {
    const FAQItem = [
        {
            FAQID: 1, FAQTitle: "包裹咨询", FAQDetails: [
                { DetailID: 1, DetailTitle: " 包裹需要到物流商自提，怎么办？", DetailsDesc: "一般上包裹都会送到我们仓库，若包裹需要提货，建议用户询问卖家是否可以要求物流商送货上门。如果包裹需要自提服务，请联系客服，客服会协助用户进行处理" },
                { DetailID: 2, DetailTitle: " 包裹已签收可是未入库怎么办?", DetailsDesc: "所有已签收的包裹都会在24-48 小时内更新入库 ， 若48小时后请尽快联系客服调查。调查工作会需要 3-5 天工作日，我们会联系快递，检查监控等等。一旦确认仓库签收，可是包裹遗失，将赔偿最高 RM1000" },
                { DetailID: 3, DetailTitle: " 是否有拆包与打包服务?", DetailsDesc: "没有拆包与打包服务，以单包裹计算运费" },
                { DetailID: 4, DetailTitle: " 包裹入库后会提供什么信息吗？", DetailsDesc: "包裹签收入库，系统会显示包裹的重量体积" },
            ]
        },
        {
            FAQID: 2, FAQTitle: "服务咨询", FAQDetails: [
                { DetailID: 1, DetailTitle: " 打木架服务", DetailsDesc: "我们提供木架服务,收费将会以货物体制为标准，最低消费为 100元" },
                { DetailID: 2, DetailTitle: " 验货服务?", DetailsDesc: "可要求验货服务，须在货物抵达前夕预先通知客服注意包裹。包裹签收后请再次提醒客服。若包裹签收数天，将无法使用此服务，请知悉" },
                { DetailID: 3, DetailTitle: " 代付服务", DetailsDesc: "可联系客服申请代付服务，汇率会以当天汇率为准，且会征收RM30服务费" },
                {
                    DetailID: 4, DetailTitle: " 海运服务特点", DetailsDesc: {
                        type: "list",
                        typeList: "icon",
                        data: [
                            { item: "包清关以及包税" }, { item: "验货服务" },
                            { item: "根据需求打包和包装" }, { item: "提供损坏赔偿 （附有条件)" }
                        ]
                    }
                },
            ]
        },
        {
            FAQID: 3, FAQTitle: "运输咨询", FAQDetails: [
                {
                    DetailID: 1, DetailTitle: " 如何分辨普货和敏感货商品", DetailsDesc:
                    {
                        type: "boldList",
                        data: [
                            { title: "普货", item: "服饰，鞋包，家具，母婴用品，运动用品，无磁铁货品，书籍", item2: "少量*( 液体/粉末类，药物，化妆品，食品，饮料，化学，香水，营养/保健品，农药，陶瓷，马桶，地砖，大理石，情趣用品 ）" },
                            { title: "敏感货", item: "陶瓷，马桶，大理石，农药，食品，饮料,电器,情趣用品" },
                            { title: "违禁品", item: "烟草，易爆易燃物体，危险物品，动物，烟草，毒品，空调冷媒，酒类，植物，充电宝, 锂电池，高压气瓶" },
                            { title: "注意", item: "若无法辨别货物类型，需先质询客服，若违规运输违禁品造成货物被海关充公，公司将不会赔偿, 需自行负上法律责任以及缴付罚款，请知悉" },
                        ]
                    }
                },
                {
                    DetailID: 2, DetailTitle: " 海运计算方式?", DetailsDesc:
                    {
                        // type: "list",
                        type: "customise",
                        // data: [
                        //     { item: "海运费 (古晋自提) 是以单件立方计算" }, { item: "计算法： 长(m) X 高(m) X 宽(m)" },
                        //     { item: "例子：0.56m X 0.35m X 1.08m = 1.222m3" }, { item: "若货物体积小过 0.01m3 为小包裹，RM4/件" }
                        //     , { item: "若 1 立方 (m3) 单个 货物重量是 500公斤以上将会用以下计算方式" }, { item: "计算法： 实重/500 = m3，例子：600kg / 500kg = 1.2m3" }
                        // ]
                    }
                },
                { DetailID: 3, DetailTitle: " 海运时效", DetailsDesc: "21-25 工作日" },
                {
                    DetailID: 4, DetailTitle: " 如何使用代运", DetailsDesc:
                    {
                        type: "list",
                        typeList: "num",
                        data: [
                            { item: "联系客服注册会员" }, { item: "将中国仓库地址资料复制到中国平台地址管理处" },
                            { item: "选为默认地址，并用此地址下单" }, { item: "仓库入库后将会自动安排运输至古晋自取点" }, { item: "货物到达自取点后将会通知取货" }
                        ]
                    }
                },
                { DetailID: 5, DetailTitle: " 超重包裹需付叉车费及运输费", DetailsDesc: "若单件重量超过100kg或人工无法搬动的货物，会征收额外叉车费叉车费将因货物体质而异，最低为 RM100 " },
                {
                    DetailID: 6, DetailTitle: " 海运需注意的事项", DetailsDesc: {
                        type: "boldList",
                        data: [
                            { title: "重量限制", item: "每立方m3的重量，不能超过500kg， 否则将按照 实重/500 = m3 来计算" },
                            { title: "叉车收费", item: "单件货物若特别重，仓库人员无法搬运则需要租借叉车。届时将会产生叉车费客户需承担" },
                            { title: "易碎品", item: "易碎品请务必让厂家加固包装，或打木架。运输不负责易碎品破碎的问题" },
                            { title: "易漏品", item: "纯液体的货物，必须打木架方可上柜。若液体渗漏，导致他人货物损坏，需要负责赔偿" },
                            { title: "海关充公", item: "因邮寄违禁品被海关扣查，将需要负上法律责任以及缴付罚款，并且货物将进行销毁" },
                            { title: "免责申明", item: "我们只提供物流服务，不会对因物流延误造成的个人/生意上的损失进行赔偿，请知悉" },
                        ]
                    }
                }
            ]
        },
        {
            FAQID: 4, FAQTitle: "售后咨询", FAQDetails: [
                { DetailID: 1, DetailTitle: " 货物丢失赔偿", DetailsDesc: "若在海运的运输过程中，发生货物丢失的问题,我们将按照货物价值进行赔偿（最高至 RM1000）" },
            ]
        },
        {
            FAQID: 5, FAQTitle: "付款咨询", FAQDetails: [
                { DetailID: 1, DetailTitle: " 如何缴付运费", DetailsDesc: "运费以货到付款方式进行，顾客需缴付运费方可取货，只收现金" },
            ]
        }
    ]

    const customizeLayout = () => {
        return (
            <div className="row" style={{ color: "#686868" }}>
                <div className="row">
                    <Typography>1) 海运费 (古晋自提) 是以单件立方计算</Typography>
                    <Typography><label style={{ fontWeight: "600" }}>计算法：</label>长(m) X 高(m) X 宽(m)</Typography>
                    <Typography><label style={{ fontWeight: "600" }}>例子：</label>0.56m X 0.35m X 1.08m = 1.222m3</Typography>
                    <Typography><label style={{ fontWeight: "600" }}>注意：</label>若货物体积小过 0.01m3 为小包裹，RM4/件</Typography>
                </div>
                <div className="row" style={{ paddingTop: "10pt" }}>
                    <Typography>2) 若 1 立方 (m3) 单个货物重量是 500公斤或以上将会用以下计算方式</Typography>
                    <Typography><label style={{ fontWeight: "600" }}>计算法：</label>实重/500 = m3</Typography>
                    <Typography><label style={{ fontWeight: "600" }}>例子：</label>600kg / 500kg = 1.2m3</Typography>
                </div>
            </div>
        )
    }
    return (
        <div style={{ margin: "20px 16px" }}  >
            <div style={{ padding: "10pt 20pt 0pt" }}>
                <Typography style={{ fontWeight: "bold", fontSize: "20pt" }}>   常见问题  </Typography>
                <hr />
            </div>
            {
                FAQItem.length > 0 && FAQItem.map((data, dataIndex) => {
                    return (
                        <div style={{ padding: "0pt 20pt 10pt" }} key={dataIndex}>
                            <Typography style={{ fontWeight: "600", fontSize: "15pt", paddingTop: "15pt" }}>{data.FAQTitle}</Typography>
                            {
                                data.FAQDetails.length > 0 && data.FAQDetails.map((details, detailIndex) => {
                                    return (
                                        <div className="row" style={{ paddingTop: "10pt" }} key={'faq_' + detailIndex}>
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={2}><InfoIcon /></Grid>
                                                        <Grid item xs={10}><Typography>{details.DetailTitle}</Typography></Grid>
                                                    </Grid>
                                                </AccordionSummary>
                                                <AccordionDetails style={{ color: "#686868" }}>
                                                    {
                                                        details.DetailsDesc.type === undefined ?
                                                            <Typography>  {details.DetailsDesc}  </Typography>
                                                            :
                                                            details.DetailsDesc.type === "list" ?
                                                                details.DetailsDesc.data.map((x, index) => {
                                                                    return (
                                                                        <Grid container spacing={2} key={index}>
                                                                            <Grid item xs={2}>
                                                                                {details.DetailsDesc.typeList === "num" ?
                                                                                    index + 1 + ". "
                                                                                    :
                                                                                    details.DetailsDesc.typeList === "empty" ? ""
                                                                                        :
                                                                                        <ArrowCircleRightIcon />
                                                                                }
                                                                            </Grid>
                                                                            <Grid item xs={10}><Typography>{x.item}</Typography></Grid>
                                                                        </Grid>
                                                                    )
                                                                })
                                                                :
                                                                details.DetailsDesc.type === "boldList" ?
                                                                    details.DetailsDesc.data.map((x, idx) => {
                                                                        return (
                                                                            <Grid container spacing={2} key={idx}>
                                                                                <Grid item xs={2}>
                                                                                    <ArrowCircleRightIcon />
                                                                                </Grid>
                                                                                <Grid item xs={10}><Typography><label style={{ paddingRight: "10pt", fontWeight: "600" }}>{x.title} :</label> <label>{x.item}</label> </Typography></Grid>
                                                                            </Grid>
                                                                        )
                                                                    })
                                                                    :
                                                                    customizeLayout()
                                                    }
                                                </AccordionDetails>
                                            </Accordion>
                                        </div>

                                    )
                                })
                            }

                        </div>
                    )
                })
            }
        </div>
    )
}
