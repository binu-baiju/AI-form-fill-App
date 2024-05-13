import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import { Client } from "@octoai/client";
import bodyParser from "body-parser";
import NextCors from "nextjs-cors";
// import Cors from "cors";

interface RequestBody {
  prompt: string;
}
// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "1mb",
//     },
//   },
// };

// const cors = Cors({
//   origin: "*", // Allow requests from any origin, you can restrict this to specific origins if necessary
//   methods: ["POST"], // Allow only POST requests, you can adjust this as needed
// });

export async function POST(req: any) {
  // await NextCors(req, res, {
  //   // Options
  //   methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  //   origin: "*",
  //   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  // });
  if (!process.env.OCTOAI_TOKEN) {
    return NextResponse.json({ error: "No OctaAI API key found." });
  }
  try {
    // if (req.body) {
    // console.log("Hello");
    // console.log("Body:", req.body);
    // const body = await req.json();
    const data = await req.json();
    // const { prompt } = body;
    // console.log(body);
    // console.log("promprtL", prompt);
    // const { prompt } = body;
    // }

    // Connect to the OctaAI Client
    const client = new Client(process.env.OCTOAI_TOKEN);
    // OctoAI completion request
    // const prompt =
    //   "full summarize this pdftext: af# 4ry*ua'*ffiSInKT  iltl0  e$StrIATltrrt  E*H&r$Lem fAffilfarerf  tc l{er*}c  JsrIo Assorisriom} President George Tho*ras ArjunaAwardee Secretary in-charge Dr,ICP.Shibu Secretarv Shaiju E.S. Vice President E. S. Santhosh Sunil K. P. Dr.  Bindhu Joint Secretarv Martin Benny Dr, K.  P. Shibu Exct' uti ve  (ktm  m i ttees Prof  Joju  P.S. Siuru Varghese Joyson  P.J. Rejith Sankar Y.M.lladesan Joby  John Akhil  M Nair District  Sports Committee  Nominees George  Thamas Ar|nna t\rrard*e Kerala  Judo Assoc'i*ticn  Nominses George  Thomas t\r  i  Luril,{r.yr  rciee Dr. Arun  S Prof.  Joju P.S. oiloscoro:  rr6dm:le,jlg1oi  am'lgilcoon<no Crud, ogo6lncelpo  *1S,  BIG&nc  c.roGqBcffu'lca0rcluoflg  Odrul 6,Jl51oi  e,mlglcaorcrno  z0z4  acdq  e-ss  o'rlnoroil  ggd*d  ,tz-{ri 6'')-il.'il.  mjl. og.)toE  oooc)fiO  oolcrDcfi ac.,nlmjl#d  *rq,  aoooffa  ooloJJrfi (rru1.c,S1.S;d.tc'r9d.o S))  ao;6',s  cESlCIrD  oocg3ru8  oL9]  cnsornlorc$A cnl  <ag ac  rn1  4[  ol  eog rm].  Lo-r  cn5 olJ  (f]  G eoJc cn arrolffA  O  H  c ag;d  mfl a;]  51  oj (6Do  {D  sSBB} o  e5 o)J m) e  {D  (orCI}  6)6)  (m  rlg)  (o0)l  G  g  o6rDo CI ffr'  ro} co8 o.r  o3 oHSJCrn] Yours  faithfully, 28.42.2A2+ Ernakulam Dr,  K,P,  Shibu Secretary  in-charge District  Judo  Association Ernakulam.";
    const completion = await client.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "hello",
        },
      ],
      model: "mixtral-8x7b-instruct", // Replace with your model name
    });
    const response = completion.choices[0].message.content;
    console.log("Response:", response);
    return NextResponse.json({ message: response });
  } catch (error) {
    return NextResponse.json({ error: "Method Not Allowed" });
  }
}
