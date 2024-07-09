import React, { useEffect, useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { RingLoader } from "react-spinners";
import fontKit from "@pdf-lib/fontkit";
import TPLeMajor from "./TP Le Major.ttf";

export default function WarrantyGene({ orderId }) {
  const [warrantyData, setWarrantyData] = useState({});
  const [orderInfo, setOrderInfo] = useState(null);
  const [pdfUrls, setPdfUrls] = useState({});
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const getOrderInfo = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://localhost:7292/api/Order/GetOrderInfo?id=${orderId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setOrderInfo(data);
        data.products.forEach((product) => {
          getWarrantyInfo(product.OrderDetailID);
        });
      } catch (error) {
        console.error(`Error fetching order info for ${orderId}:`, error);
      } finally {
        setLoading(false);
      }
    };

    const getWarrantyInfo = async (orderDetailID) => {
      try {
        const response = await fetch(
          `https://localhost:7292/api/Warranty/WarrantyInfo?orderDetailID=${orderDetailID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setWarrantyData((prevData) => ({
          ...prevData,
          [orderDetailID]: data,
        }));
      } catch (error) {
        console.error(
          `Error fetching warranty info for ${orderDetailID}:`,
          error
        );
      }
    };

    if (orderId) {
      getOrderInfo();
    }
  }, [orderId]);

  useEffect(() => {
    Object.keys(warrantyData).forEach((id) => {
      if (warrantyData[id]) {
        generatePdf(warrantyData[id], id);
      }
    });
  }, [warrantyData]);

  const generatePdf = async (warrantyInfo, orderDetailID) => {
    try {
      setGenerating(true);
      // Register Fontkit
      const pdfDoc = await PDFDocument.create();
      pdfDoc.registerFontkit(fontKit);

      // Load existing PDF template
      const existingPdfBytes = await fetch("/warranty.pdf").then((res) =>
        res.arrayBuffer()
      );

      // Load custom font directly from import
      const fontBytes = await fetch(TPLeMajor).then((res) => res.arrayBuffer());

      // Embed custom font
      const customFont = await pdfDoc.embedFont(fontBytes);

      // Load the existing PDF template into the new document
      const templatePdf = await PDFDocument.load(existingPdfBytes);
      const [templatePage] = await pdfDoc.copyPages(templatePdf, [0]);
      pdfDoc.addPage(templatePage);

      // Get the first page of the PDF
      const firstPage = pdfDoc.getPages()[0];
      const startDate = warrantyInfo.StartDate.slice(0, 10);
      const endDate = warrantyInfo.EndDate.slice(0, 10);
      const productName = warrantyInfo.ProductName.toLowerCase();
      // Warranty ID
      firstPage.drawText(`${warrantyInfo.WarrantyID}`, {
        x: 150,
        y: 488,
        size: 18,
        font: customFont,
        color: rgb(1, 1, 1),
      });
      firstPage.drawText(
        `A special thank to Mr/Mrs ${warrantyInfo.CustomerName}`,
        {
          x: 140,
          y: 420,
          size: 13,
          font: customFont,
          color: rgb(1, 1, 1),
        }
      );
      firstPage.drawText(`Warranty information`, {
        x: 140,
        y: 390,
        size: 13,
        font: customFont,
        color: rgb(1, 1, 1),
      });
      firstPage.drawText(`Product ID: ${warrantyInfo.ProductID}`, {
        x: 140,
        y: 360,
        size: 12,
        font: customFont,
        color: rgb(1, 1, 1),
      });
      firstPage.drawText(`Product name: ${productName}`, {
        x: 140,
        y: 330,
        size: 12,
        font: customFont,
        color: rgb(1, 1, 1),
      });
      firstPage.drawText(`Category: ${warrantyInfo.Category}`, {
        x: 140,
        y: 300,
        size: 12,
        font: customFont,
        color: rgb(1, 1, 1),
      });
      firstPage.drawText(
        `Material: ${warrantyInfo.Material} ${warrantyInfo.MaterialWeight}g, ${warrantyInfo.GemCaratWeight} Carat`,
        {
          x: 140,
          y: 270,
          size: 12,
          font: customFont,
          color: rgb(1, 1, 1),
        }
      );
      firstPage.drawText(`Gem Origin: ${warrantyInfo.GemOrigin}`, {
        x: 140,
        y: 240,
        size: 12,
        font: customFont,
        color: rgb(1, 1, 1),
      });
      firstPage.drawText(`Warranty period from: ${startDate} to: ${endDate}`, {
        x: 140,
        y: 210,
        size: 13,
        font: customFont,
        color: rgb(1, 1, 1),
      });

      // Save the PDFDocument to bytes
      const pdfBytes = await pdfDoc.save();

      // Create a blob from the PDF bytes
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

      // Create an object URL from the blob
      const url = URL.createObjectURL(pdfBlob);

      setPdfUrls((prevUrls) => ({
        ...prevUrls,
        [orderDetailID]: url,
      }));
    } catch (error) {
      console.error(`Error generating PDF for ${orderDetailID}:`, error);
    } finally {
      setGenerating(false);
    }
  };

  const openAllPdfs = () => {
    const urls = Object.values(pdfUrls);
    urls.forEach((url, index) => {
      setTimeout(() => {
        window.open(url, "_blank");
      }, index * 500);
    });
  };

  return (
    <div className="">
      {loading ||
      generating ||
      Object.keys(pdfUrls).length !== orderInfo?.products?.length ? (
        <RingLoader size={45} color="#54cc26" />
      ) : (
        <div onClick={openAllPdfs} className="relative cursor-pointer">
          <div className="">
            <ion-icon size="large" name="open-outline"></ion-icon>
          </div>
        </div>
      )}
    </div>
  );
}
