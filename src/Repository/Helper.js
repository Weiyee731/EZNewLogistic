
import axios from "axios";
import moment from "moment";

// validation functions
export const isStringNullOrEmpty = (value) => { return (typeof value === 'undefined') ? true : (value === null || value == null) ? true : (typeof value === "string" && value.trim() === "") ? true : false }
export const isObjectUndefinedOrNull = (obj) => { return (typeof obj === 'undefined' || obj === null) ? true : false }
export const isArrayNotEmpty = (list) => {
    try {
        if (typeof list !== 'undefined' && list !== null && Array.isArray(list) && list.length > 0)
            return true
        else
            return false
    }
    catch (e) {
        console.log(e)
        return false
    }
}
export const isContactValid = (contact) => { return (typeof contact !== 'undefined' && contact !== '' && /^(0|1)[0-46-9.\-]*[0-9.\-]{7,8}?$/.test(contact)) }
export const isEmailValid = (email) => { return (typeof email === 'undefined' || email === '' || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) ? false : true }
export const isLongitude = (longitude) => { return isFinite(longitude) && Math.abs(longitude) <= 180; }
export const isLatitude = (latitude) => { return isFinite(latitude) && Math.abs(latitude) <= 90; }
export const isDecimalValid = (number) => { return (typeof number === 'undefined' || number == '' || !/^[0-9]\d*(\.\d+)?$/.test(number)) ? true : false }
export const isNumber = (number) => { return (!isStringNullOrEmpty(number) && !isNaN(number)) }
//time functions
export const convertDateTimeToString112Format = (date, fetchTime) => {
    try {
        let date112 = typeof date !== "undefined" && date !== "" ? new Date(date) : new Date();
        let dd = (date112.getDate().toString().length <= 1) ? "0" + date112.getDate() : date112.getDate().toString()
        let mm = ((date112.getMonth() + 1).toString().length <= 1) ? "0" + (date112.getMonth() + 1) : (date112.getMonth() + 1).toString()
        let yyyy = date112.getFullYear();
        let HH = (date112.getHours().toString().length <= 1) ? "0" + date112.getHours() : date112.getHours().toString()
        let MM = (date112.getMinutes().toString().length <= 1) ? "0" + date112.getMinutes() : date112.getMinutes().toString()
        let ss = (date112.getSeconds().toString().length <= 1) ? "0" + date112.getSeconds() : date112.getSeconds().toString()

        return (fetchTime === true) ? (yyyy.toString() + "/" + mm + "/" + dd + " " + HH + ":" + MM + ":" + ss) : (yyyy.toString() + "/" + mm + "/" + dd)
    }
    catch (e) {
        let date112 = new Date();
        let dd = (date112.getDate().toString().length <= 1) ? "0" + date112.getDate() : date112.getDate().toString()
        let mm = ((date112.getMonth() + 1).toString().length <= 1) ? "0" + (date112.getMonth() + 1) : (date112.getMonth() + 1).toString()
        let yyyy = date112.getFullYear();
        let HH = (date112.getHours().toString().length <= 1) ? "0" + date112.getHours() : date112.getHours().toString()
        let MM = (date112.getMinutes().toString().length <= 1) ? "0" + date112.getMinutes() : date112.getMinutes().toString()
        let ss = (date112.getSeconds().toString().length <= 1) ? "0" + date112.getSeconds() : date112.getSeconds().toString()

        return (fetchTime === true) ? (yyyy.toString() + "/" + mm + "/" + dd + " " + HH + ":" + MM + ":" + ss) : (yyyy.toString() + "/" + mm + "/" + dd)
    }
}

export const convertDateTimeTo112Format_Moment = (date) => {
    return date.getFullYear() + "" + leftPad(parseInt(date.getMonth() + 1), 2) + "" + leftPad(date.getDate(), 2)
}


// text transformation functions
export const capitalizeFirstLetterOfSentences = (text) => { return (typeof text !== "undefined" ? text.slice(0, 1).toUpperCase() + text.slice(1, text.length) : "") }
export const capitalizeEveryFirstLetter = (text) => { return (typeof text !== "undefined" ? text.replace(/\b(\w)/g, s => s.toUpperCase()) : "") }
export const convertArrayToStringWithSpecialCharacter = (list, sc) => {
    sc = (sc !== null) ? sc : ", "
    if (!Array.isArray(list))
        return "";
    else {
        let text = ""
        for (let i = 0; i < list.length; i++) {
            text += list[i]
            if (i == list.length - 1)
                break;
            else
                text += sc
        }
        return text;
    }
}
export const extractNumberFromStrings = (text) => { return (typeof text === "string") ? Number("5g".replace(/[^0-9\.]+/g, "")) : 0 }

// image utilities functions
export const getImageOrientationType = (imageWidth, imageHeight) => {
    if (Number(imageWidth) > Number(imageHeight))
        return "Landscape"
    else if (Number(imageWidth) < Number(imageHeight))
        return "Potrait"
    else
        return "Square"
}

// file handler
export const getFileExtension = (file) => {
    if (typeof file !== "undefined" && typeof file === 'string')
        return file.split('.').pop();
    else {
        try {
            if (file.length > 0) {
                let fileExts = []
                file.map(el => { return fileExts.push(el.name.split('.').pop()) })
                return fileExts
            }
            else {
                return file.name.split('.').pop()
            }
        } catch (e) {
            console.log("getFileExtension: this is not a file")
            return "";
        }
    }
}

export const getFileTypeByExtension = (ext) => {
    if (typeof ext !== "string") {
        console.log("getFileTypeByExtension: this is not a string")
        return ""
    }
    else {
        ext = ext.replace(".", "")
        ext = ext.toLowerCase()
        switch (ext) {
            case "jpg":
            case "jpeg":
            case "png":
                return "image";

            case "mp4":
            case "avi":
            case "mov":
                return "video";

            case "txt":
            case "pdf":
            case "ppt":
                return "file";

            case "docx":
            case "doc":
                return "docs";

            case "xls":
            case "xlsx":
            case "csv":
                return "excel";

            default:
                console.log("getFileTypeByExtension: the value is not found in the library")
                return ""
        }
    }
}

// screen function
export function getWindowDimensions() {
    const { innerWidth: screenWidth, innerHeight: screenHeight } = window;
    return { screenWidth, screenHeight };
}

// currency / money handler functions
export const roundOffTotal = (val) => {
    try {
        if (Number(val) % 0)
            return 0
        else {
            let amount = Number(val).toFixed(2).toString();
            let decimal = amount.split(".").pop()
            amount = amount.split(".")[0]
            decimal = decimal.toString().split("")

            let firstDigit = decimal[0]
            let lastDigit = decimal.pop()

            let roundingOff;
            if (Number(lastDigit) < 5) {
                roundingOff = firstDigit.toString() + "0"
                return amount.toString().concat("." + roundingOff.toString())
            } else {
                if (firstDigit == 9) {
                    amount = Number(amount) + 1
                    roundingOff = amount.toString() + ".00"
                }
                else {
                    firstDigit = Number(firstDigit) + 1
                    roundingOff = amount.toString() + "." + firstDigit.toString() + "0"
                }
                return roundingOff
            }
            // switch (Number(lastDigit)) {
            //     case 0:
            //     case 1:
            //     case 2:
            //         roundingOff = firstDigit.toString() + "0"
            //         return Number(amount.toString().concat("." + roundingOff.toString())).toFixed(2)
            //         break;

            //     case 3:
            //     case 4:
            //     case 5:
            //     case 6:
            //     case 7:
            //         roundingOff = firstDigit.toString() + "5"
            //         return Number(amount.toString().concat("." + roundingOff.toString())).toFixed(2)
            //         break;

            //     case 8:
            //     case 9:
            //         if (firstDigit == 9) {
            //             amount = Number(amount) + 1
            //             roundingOff = amount.toString() + ".00"
            //         }
            //         else {
            //             firstDigit = Number(firstDigit) + 1
            //             roundingOff = amount.toString() + "." + firstDigit.toString() + "0"
            //         }
            //         return Number(roundingOff).toFixed(2)
            //         break;

            //     default:
            //         break;
            // }
        }
    }
    catch (e) { console.error("Error: " + e) }
}

// round up for weight
export const round = (num, places) => {
    let amount = Number(num).toFixed(4).toString();
    let decimal = amount.split(".").pop()
    amount = amount.split(".")[0]
    decimal = decimal.toString().split("")

    let forthDigit = decimal[places]
    let roundingUp;
    if (Number(forthDigit) > 0) {
        decimal[places - 1] = Number(decimal[places - 1]) + 1
        decimal.pop()
        roundingUp = `${amount.toString()}.${decimal.join("")}`
    } else {
        roundingUp = `${amount.toString()}.${decimal.join("")}`
    }
    return Number(roundingUp).toFixed(3)
}

export const volumeCalc = (depth, width, height) => {
    let volume = (depth * width * height) / 1000000
    volume = round(volume, 3)
    return Number(volume)
}

// localStorage
export const resetLocalStorage = () => { localStorage.clear() }

// self-class function
const leftPad = (number, targetLength) => {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}

// split array
export const splitArray = (arr, len) => {
    var chunks = [], i = 0, n = isArrayNotEmpty(arr) ? arr.length : 0;
    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }
    return chunks;
}

// uploader
export const uploader = async (directory, imgArray, filenameArray, uploadUrl) => {
    const formData = new FormData();
    formData.append("Directory", directory);
    for (var j = 0; j < imgArray.length; j++) {
        formData.append("upload[]", imgArray[j]);
        formData.append("fileName[]", filenameArray[j]);
    }
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const resp = await axios.post(uploadUrl, formData, config)
    try {
        return (resp.status == 200 && resp.data == 1) ? true : false
    }
    catch (err) {
        console.log(err)
        return false
    }
}

export const uploader64 = async (directory, imgArray, filenameArray, uploadUrl) => {
    const formData = new FormData();
    formData.append("Directory", directory);
    let filesExt = []
    for (var j = 0; j < imgArray.length; j++) {
        let fileExt = getFileExtension(imgArray[j])
        formData.append("upload", imgArray[j]);
        formData.append("fileName", filenameArray[j]);
    }
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const resp = await axios.post(uploadUrl, formData, config)
    try {
        return (resp.status == 200 && resp.data == 1) ? true : false
    }
    catch (err) {
        console.log(err)
        return false
    }
}

export const getDOB = (x) => {
    let fullDate = ""
    let year = x.substring(0, 2);
    let month = x.substring(2, 4);
    let day = x.substring(4, 6);

    if (!isNaN(Number(year)) && !isNaN(Number(month)) && !isNaN(Number(day))) {
      if (year.substring(0, 1) === 0 || year.substring(0, 1) === "0")
        year = "20".concat(year)
      else
        year = "19".concat(year)

      month = month - 1
      let canddob = new Date(year, month, day)

      fullDate = moment(canddob).format('YYYY-MM-DD')
    }
    return fullDate
}

export const getGender = (x) => {
    let last2Digit = x.substring(13, 14)
    let gender = ""

    if (Number(last2Digit) % 2 === 0) {
      gender = 'P'
    } else {
      gender = 'L'
    }
    return gender
}

export const handleOldNric = (nric) => {
    let condition = ""
    let year = nric.substring(0, 2);

    if (!isNaN(Number(year))) {
      if (year.substring(0, 1) === 0 || year.substring(0, 1) === "0")
        year = "20".concat(year)
      else
        year = "19".concat(year)
    }

    if (Number(year) < 1976) {
      condition = true
    } else {
      condition = false
    }

    return condition
}

// export const renderPrintListing = (data) => {

//     return (
//         <div
//             style={{
//                 width: "100%",
//                 height: "80px",
//                 position: "relative"
//             }}
//         >
//             <div className='clearfix' >
//                 <div className='float-start d-flex'>
//                     <img src={logo} width="30vw" style={{ margin: 'auto', paddingBottom: '5px' }} alt="" />
//                     <Typography variant="body2" className='float-start d-flex mt-1' style={{ fontSize: "12pt", paddingLeft: '5px' }}>Application Form</Typography>
//                 </div>
//                 <div className="float-end d-flex fw-bold">
//                     {data.MemberNumber}
//                 </div>
//             </div>
//             <div className="row" style={{ paddingLeft: "2vw" }}>
//                 <div className="row">
//                     <div style={{
//                         padding: '8px', marginBottom: '3px'
//                     }}>
//                         <div className="row mb-1 align-items-center">
//                             <div className="col-6">
//                                 <div className="row">
//                                     <div className="col-6">
//                                         <Typography variant="body1" style={{ fontWeight: "bold", fontSize: "9pt" }}>Jenis Ahli/ Member Type/ 会员类型:</Typography>
//                                     </div>
//                                     <div className="col-6">
//                                         <Typography variant="body2" className='float-start d-flex mt-1' style={{ fontSize: "10pt" }}>{data.MemberSubcriptionMethodID === 0 ? 'SEKALIGUS / 一次性 / ONCE AND FOR ALL' : 'BAYAR SETIAP TAHUN / 逐年还 / ANNUALLY'}</Typography>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-6">
//                                 <div className="row">
//                                     <div className="col-6">
//                                         <Typography variant="body1" style={{ fontWeight: "bold", fontSize: "9pt" }}>Nombor Resit/ Receipt Number/ 收据号码:</Typography>
//                                     </div>
//                                     <div className="col-6">
//                                         <Typography variant="body2" className='float-start d-flex mt-1' style={{ fontSize: "10pt" }}>{data.MemberPaymentReceipt} ({data.MemberSubcriptionMethodID === 0 ? "O" : "A"})</Typography>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row mb-1 align-items-center">
//                             <div className="col-12">
//                                 <div className="row">
//                                     <div className="col-3">
//                                         <Typography variant="body1" style={{ fontWeight: "bold", fontSize: "9pt" }}>Nama Ahli/ Member Name/ 姓名:</Typography>
//                                     </div>
//                                     <div className="col-9">
//                                         <Typography variant="body2" className='float-start d-flex mt-1' style={{ fontSize: "10pt" }}>{data.MemberName}</Typography>
//                                     </div>
//                                 </div>
//                             </div>
//                             {/* <div className="col-6">
//                                 <div className="row">
//                                     <div className="col-6">
//                                         <Typography variant="body1" style={{ fontWeight: "bold", fontSize: "9pt" }}>Nama Mandarin/ Mandarin Name/ 中文名:</Typography>
//                                     </div>
//                                     <div className="col-6">
//                                         <Typography variant="body2" className='float-start d-flex mt-1' style={{ fontSize: "10pt" }}>{data.MemberChineseName}</Typography>
//                                     </div>
//                                 </div>
//                             </div> */}
//                         </div>
//                         <div className="row mb-1 align-items-center">
//                             <div className="col-6">
//                                 <div className="row">
//                                     <div className="col-6">
//                                         <Typography variant="body1" style={{ fontWeight: "bold", fontSize: "9pt" }} >Nombor Pengenalan/ NRIC/ 身份证号码:</Typography>
//                                     </div>
//                                     <div className="col-6">
//                                         <Typography variant="body2" className='float-start d-flex mt-1' style={{ fontSize: "10pt" }}>{data.MemberNRIC}</Typography>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-6">
//                                 <div className="row">
//                                     <div className="col-6">
//                                         <Typography variant="body1" style={{ fontWeight: "bold", fontSize: "9pt" }}> Nombor Pengenalan Lama/ Old NRIC/ 旧身份证号码:</Typography>
//                                     </div>
//                                     <div className="col-6">
//                                         <Typography variant="body2" className='float-start d-flex mt-1' style={{ fontSize: "10pt" }}>{data.MemberOldNRIC}</Typography>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row mb-1 align-items-center">
//                             <div className="col-6">
//                                 <div className="row">
//                                     <div className="col-6">
//                                         <Typography variant="body1" style={{ fontWeight: "bold", fontSize: "9pt" }}>Jantina/ Gender/ 性别:</Typography>
//                                     </div>
//                                     <div className="col-6">
//                                         <Typography variant="body2" className='float-start d-flex mt-1' style={{ fontSize: "10pt" }}>{data.MemberGender}</Typography>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-6">
//                                 <div className="row">
//                                     <div className="col-6">
//                                         <Typography variant="body1" style={{ fontWeight: "bold", fontSize: "9pt" }}>Tarikh Lahir/ Date of Birth/ 出生日期:</Typography>
//                                     </div>
//                                     <div className="col-6">
//                                         <Typography variant="body2" className='float-start d-flex mt-1' style={{ fontSize: "10pt" }}>{data.MemberDOB}</Typography>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row mb-1 align-items-center">
//                             <div className="col-6">
//                                 <div className="row">
//                                     <div className="col-6">
//                                         <Typography variant="body1" style={{ fontWeight: "bold", fontSize: "9pt" }}>Nombor Kontak/ Contact Number/ 联系号码:</Typography>
//                                     </div>
//                                     <div className="col-6">
//                                         <Typography variant="body2" className='float-start d-flex mt-1' style={{ fontSize: "10pt" }}>{data.MemberContact}</Typography>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-6">
//                                 <div className="row">
//                                     <div className="col-6">
//                                         <Typography variant="body1" style={{ fontWeight: "bold", fontSize: "9pt" }}>Emel/ Email/ 邮件地址:</Typography>
//                                     </div>
//                                     <div className="col-6 text-wrap">
//                                         <Typography variant="body2" className='float-start d-flex mt-1' style={{ fontSize: "10pt" }}>{data.MemberEmail}</Typography>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row mb-1 align-items-center">
//                             <div className="col-6">
//                                 <div className="row">
//                                     <div className="col-6">
//                                         <Typography variant="body1" style={{ fontWeight: "bold", fontSize: "9pt" }}>Ethnic/ Ethnic/ 种族:</Typography>
//                                     </div>
//                                     <div className="col-6">
//                                         <Typography variant="body2" className='float-start d-flex mt-1' vvstyle={{ fontSize: "10pt" }}>{data.Ethnic}</Typography>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-6">
//                                 <div className="row">
//                                     <div className="col-6">
//                                         <Typography variant="body1" style={{ fontWeight: "bold", fontSize: "9pt" }}>Pekerjaan/ Occupation/ 职业:</Typography>
//                                     </div>
//                                     <div className="col-6">
//                                         <Typography variant="body2" className='float-start d-flex mt-1' style={{ fontSize: "10pt" }}>{data.OccupationType}</Typography>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row mb-1 align-items-center">
//                             <div className="col-12">
//                                 <div className="row">
//                                     <div className="col-3">
//                                         <Typography variant="body1" style={{ fontWeight: "bold", fontSize: "9pt" }}>Alamat dalam IC/ Residential Address in NRIC/ 住址根据身份证:</Typography>
//                                     </div>
//                                     <div className="col-9 text-wrap">
//                                         <Typography variant="body2" className='float-start d-flex mt-1' style={{ fontSize: "10pt" }}>{data.MemberAddress}</Typography>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row mb-1 align-items-center">
//                             <div className="col-6">
//                                 <div className="row">
//                                     <div className="col-6">
//                                         <Typography variant="body1" style={{ fontWeight: "bold", fontSize: "9pt" }}>Parliament:</Typography>
//                                     </div>
//                                     <div className="col-6">
//                                         <Typography variant="body2" className='float-start d-flex mt-1' style={{ fontSize: "10pt" }}>{data.ParliamentCode}- {data.ParliamentName}</Typography>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-6">
//                                 <div className="row">
//                                     <div className="col-6">
//                                         <Typography variant="body1" style={{ fontWeight: "bold", fontSize: "9pt" }}>Branch:</Typography>
//                                     </div>
//                                     <div className="col-6">
//                                         <Typography variant="body2" className='float-start d-flex mt-1' style={{ fontSize: "10pt" }}>{data.BranchCode}- {data.BranchName}</Typography>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row my-2">
//                             <div className="col-4 col-md-3">
//                                 <div style={{ fontSize: "9pt" }}>*Saya Juga Ingin Menyertai </div>
//                                 <div style={{ fontSize: "9pt" }}>*我谨此同时申请加入 </div>
//                                 <div style={{ fontSize: "9pt" }}>*I Also Wish To Join </div>
//                             </div>
//                             <div className="col-8">
//                                 <div className="d-flex justify-content-between">
//                                     <FormControlLabel
//                                         sx={{ fontSize: "8pt" }}
//                                         control={<Checkbox checked={!isObjectUndefinedOrNull(data.MemberCategoryId) && data.MemberCategoryId.includes('1')} />}
//                                         label={<Typography variant="body2" className='float-start d-flex mt-1' style={{ fontSize: "10pt" }}>Gerakan Pemuda / 青年团 / Youth Wing</Typography>}
//                                         // label="Gerakan Pemuda / 青年团 / Youth Wing"
//                                         onChange={(e, value) => {
//                                             this.handleChange(e.target.checked, value, "YouthWing");
//                                         }}
//                                     />
//                                     <FormControlLabel
//                                         sx={{ fontSize: "8pt" }}
//                                         control={<Checkbox checked={!isObjectUndefinedOrNull(data.MemberCategoryId) && data.MemberCategoryId.includes('2')} />}
//                                         label={<Typography variant="body2" className='float-start d-flex mt-1' style={{ fontSize: "10pt" }}>Gerakan Wanita / 妇女组 / Women Wing</Typography>}
//                                         // label="Gerakan Wanita / 妇女组 / Women Wing"
//                                         onChange={(e, value) => {
//                                             this.handleChange(e.target.checked, value, "WomenWing");
//                                         }}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row mb-2">
//                             <div className="col-3 col-md-3">
//                                 <FormControlLabel
//                                     control={<Checkbox checked={true} />}
//                                     label={
//                                         <div>
//                                             <div style={{ fontSize: "9pt" }}>Saya bersetuju </div>
//                                             <div style={{ fontSize: "9pt" }}>我同意</div>
//                                             <div style={{ fontSize: "9pt" }}>I acknowledged</div>
//                                         </div>
//                                     }
//                                     onChange={(e, value) => {
//                                         this.handleChange(e.target.checked, value, "DeclarationChecked");
//                                     }}
//                                 />
//                             </div>
//                             <div className="col-9 col-md-9">
//                                 <p style={{ fontSize: "9pt" }}>
//                                     Dengan ini saya memohon menjadi ahli Parti Rakyat Bersatu Sarawak.
//                                     Saya bersumpah bahawa saya akan menumpukan taat setia saya kepada
//                                     Malaysia; Taat kepada dasar-dasar dan tatatertib parti dan saya
//                                     akan memberi sokong kepada Parti dengan sepenuhnya. Saya bukan
//                                     ahli parti poiltik Malaysia yang lain. Saya dengan ikhlasnya
//                                     bersumpah agar segala maklumat yang diberikan kepada parti adalah
//                                     betul dan tepat.
//                                 </p>
//                                 <p style={{ fontSize: "9pt" }}>
//                                     我谨此申请成为砂拉越人民联合党党员，我宣誓效忠马来西亚，遵守党的纪律和原则，并保证给党以积极支持。我谨此声明我不属于其他马来西亚党之党员。所有填报给党的资料全属实。
//                                 </p>
//                                 <p style={{ fontSize: "9pt" }}>
//                                     I hereby apply for membership of the Sarawak United People's
//                                     Party. I pledge taht I am loyal to Malaysia and I will abide by
//                                     the Rules and Principles of the Party and to give my fullese
//                                     support. I am not a registered member of any other political party
//                                     in Malaysia and further declare that all the particulars given by
//                                     me to the party are true and correct.
//                                 </p>
//                                 <p style={{ fontSize: "9pt" }}>
//                                     Aku minta nyadi kaban Gerempong Sa'ati Rakyat Sarawak. Aku ngaku
//                                     diri empu talok ati ngagai Malaysia lalu sanggup bepegai ba semoa
//                                     ator enggau adat parti tu, lalu nyukong serta ngemansang ke semoa
//                                     pengawa iya. Aku ngako empai nyadi kaban parti politik ke di
//                                     tumbuh di Malaysia; serta ngako semoa perkara di terang oleh aku
//                                     ngagai parti tu ianya utai ke betul.
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="d-flex justify-content-end">
//                             <Typography variant="p" style={{ fontWeight: "bold", fontSize: "9pt" }}>Tandatangan Pegawai/ Officer's Signature/ 官员签名</Typography>
//                         </div>
//                         <br />
//                         <div className="d-flex justify-content-end">
//                             <img src="https://triviix.com/SUPPImages/signature/signature.png" alt="signature" style={{ width: "60px", height: "60px" }} />
//                         </div>
//                         <Typography variant="p" className='d-flex justify-content-end'>__________________________________</Typography>
//                         <Typography variant="p" className='d-flex justify-content-end'>Datuk Matthew Chen Thin Kong</Typography>
//                         <Typography variant="p" className='d-flex justify-content-end'>Sarawak United Peoples' Party (SUPP)</Typography>
//                         <Typography variant="p" className='d-flex justify-content-end'>Organising Secretary</Typography>
//                     </div>
//                     <div className="page-break"
//                         style={{
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignContent: 'center',

//                         }}
//                     >
//                         {/* <h4 style={{ marginLeft: "1vw", marginBottom: '10px', fontWeight: "bold" }}> References </h4> */}
//                         {/* <div className="row">
//                             <div className="col-12">
//                                 <div className="row">
//                                     <div className="col-6">
//                                         <Typography variant="body1" style={{ fontWeight: "bold", fontSize: "11pt" }}>Gambar IC (Depan) / 身份证 (前) / IC (Front)</Typography>
//                                     </div>
//                                     <div className="col-6">
//                                         <Typography variant="body1" style={{ fontWeight: "bold", fontSize: "11pt" }}>Gambar IC Belakang / 身份证 (后) / IC (Back):</Typography>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div> */}
//                         <div className="row" justifyContent="center" display="flex">
//                             <div className="col-12">
//                                 <div className="row"
//                                     style={{
//                                         display: 'flex',
//                                         justifyContent: 'center',
//                                         alignContent: 'center',

//                                     }}
//                                 >
//                                     <div className="col-12" style={{ display: 'flex', padding: '25px', alignItems: 'center', justifyContent: 'center' }}>
//                                         {/* <Typography variant="body2" className='float-start d-flex mt-2'> */}
//                                         <img src={data.MemberNRICFront} alt="profile" style={{ width: "60%", height: "auto" }} />
//                                         {/* </Typography> */}
//                                     </div>
//                                     <div className="col-12" style={{ display: 'flex', padding: '25px', alignItems: 'center', justifyContent: 'center' }}>
//                                         {/* <Typography variant="body2" className='float-start d-flex mt-2'> */}
//                                         <img src={data.MemberNRICBack} alt="profile" style={{ width: "60%", height: "auto" }} />
//                                         {/* </Typography> */}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div >
//         </div>
//     )
// }

export const formatICNO = (e, icno) => {
    if (e.nativeEvent.inputType !== 'deleteContentBackward' && (icno.length === 6 || icno.length === 9)) {
        icno += '-';
    }
    return icno.slice(0, 14)
}

export const getAgeByIcno = (icno) => {
    if (icno.length >= 6) {
        let year = icno.substring(0, 2);
        let month = icno.substring(2, 4);
        let day = icno.substring(4, 6);

        if (!isNaN(Number(year)) && !isNaN(Number(month)) && !isNaN(Number(day))) {
            if (year.substring(0, 1) === 0 || year.substring(0, 1) === "0")
                year = "20".concat(year)
            else
                year = "19".concat(year)

            month = month - 1
            let age = new Date().getFullYear() - year
            return age
        }
    }
}