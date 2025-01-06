import { NextResponse } from "next/server";
import { OpenAI } from "@langchain/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";


const llm = new OpenAI({
  model: "gpt-3.5-turbo-instruct",
  temperature: 0,
  apiKey: process.env.OPENAI_API_KEY,
});


  const loader = new PDFLoader("src/Rawdata/Nahjul-Balagha.pdf");
  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 1,
  });

  const mychunks = await splitter.splitDocuments(docs);
  console.log("This is book's chunks length:", mychunks.length);

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  
console.log(embeddings)






export async function POST(req) {
  try {
    const body = await req.json();
    const { message } = body;
    const completion = await llm.invoke(message);

    return NextResponse.json(
      { message: "Messages sent successfully", serverMessage: `${completion}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: error.message || "Something went wrong",
        details: error.moreInfo,
      },
      { status: error.status || 500 }
    );
  }
}
