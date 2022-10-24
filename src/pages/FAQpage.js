import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { IconButton } from "@mui/material";

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
                    DetailID: 4, DetailTitle: " 海运服务特点", DetailsDesc: [
                        { item: "包清关以及包税" }, { item: "验货服务" },
                        { item: "根据需求打包和包装" }, { item: "提供损坏赔偿 （附有条件)" }]
                },
            ]
        },
        {
            FAQID: 3, FAQTitle: "运输咨询", FAQDetails: [
                { DetailID: 1, DetailTitle: " 如何分辨普货和敏感货商品", DetailsDesc: "我们提供木架服务,收费将会以货物体制为标准，最低消费为 100元" },
                { DetailID: 2, DetailTitle: " 海运计算方式?", DetailsDesc: "可要求验货服务，须在货物抵达前夕预先通知客服注意包裹。包裹签收后请再次提醒客服。若包裹签收数天，将无法使用此服务，请知悉" },
                { DetailID: 3, DetailTitle: " 海运时效", DetailsDesc: "可联系客服申请代付服务，汇率会以当天汇率为准，且会征收RM30服务费" },
                {
                    DetailID: 4, DetailTitle: " 如何使用代运", DetailsDesc: [
                        { item: "包清关以及包税" }, { item: "验货服务" },
                        { item: "根据需求打包和包装" }, { item: "提供损坏赔偿 （附有条件)" }]
                },
                { DetailID: 5, DetailTitle: " 超重包裹需付叉车费及运输费", DetailsDesc: "若单件重量超过100kg或人工无法搬动的货物，会征收额外叉车费叉车费将因货物体质而异，最低为 RM100 " },
                { DetailID: 6, DetailTitle: " 海运需注意的事项", DetailsDesc: "可联系客服申请代付服务，汇率会以当天汇率为准，且会征收RM30服务费" },
               
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
    return (
        <div style={{ margin: "20px 16px" }}  >
            {
                FAQItem.length > 0 && FAQItem.map((data, dataIndex) => {
                    return (
                        <div>
                            <Typography style={{ fontWeight: "600", fontSize: "15pt", paddingTop: "10pt" }}>{data.FAQTitle}</Typography>
                            {
                                data.FAQDetails.length > 0 && data.FAQDetails.map((details, detailIndex) => {
                                    return (
                                        <div className="row" style={{ paddingTop: "10pt" }}>
                                            <Accordion >
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <Typography fontWeight={'bold'}>{details.DetailTitle}</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    {
                                                        !Array.isArray(details.DetailsDesc) ?
                                                            <Typography >  {details.DetailsDesc}  </Typography>
                                                            :
                                                            details.DetailsDesc.map((x) => {
                                                                return (
                                                                    <Typography ><label style={{paddingRight:"10pt"}}><ArrowCircleRightIcon /> </label> {x.item}  </Typography>
                                                                )
                                                            })

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
            {/* <div>
                <h1>包裹咨询</h1>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>包裹需要到物流商自提，怎么办？</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography fontWeight={'bold'}>
                            一般上包裹都会送到我们仓库，若包裹需要提货，建议用户询问卖家是否可以要求物流商送货上门。如果包裹需要自提服务，请联系客服，客服会协助用户进行处理
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>包裹已签收可是未入库怎么办?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            所有已签收的包裹都会在24-48 小时内更新入库 ， 若48小时后请尽快联系客服调查。调查工作会需要 3-5 天工作日，我们会联系快递，检查监控等等。一旦确认仓库签收，可是包裹遗失，将赔偿最高 RM1000
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>是否有拆包与打包服务</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            没有拆包与打包服务，以单包裹计算运费
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>包裹入库后会提供什么信息吗？</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            包裹签收入库，系统会显示包裹的重量体积
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>

            <div>
                <h1>服务咨询</h1>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>打木架服务</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography fontWeight={'bold'}>
                            我们提供木架服务，收费将会以货物体制为标准，最低消费为 100元
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>有验货服务吗？</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            可要求验货服务，须在货物抵达前夕预先通知客服注意包裹。包裹签收后请再次提醒客服。若包裹签收数天，将无法使用此服务，请知悉
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>代付服务</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            可联系客服申请代付服务，汇率会以当天汇率为准，且会征收RM30服务费
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>海运服务特点</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            包清关以及包税
                            验货服务
                            根据需求打包和包装
                            提供损坏赔偿 （附有条件)
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div> */}

        </div>
    )
}
