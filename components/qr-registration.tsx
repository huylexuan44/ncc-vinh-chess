"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, QrCode, CheckCircle, AlertCircle, Users } from "lucide-react";

interface QRData {
  registerCode: string;
  donationCode: string;
}

interface StatisticData {
  maxRegister: number;
  currentRegistered: number;
  isFull: boolean;
  totalDonationAmount: number;
}

export default function QRRegistration() {
  const [qrData, setQrData] = useState<QRData | null>(null);
  const [statisticData, setStatisticData] = useState<StatisticData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQRCodes = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch QR codes
      const qrResponse = await fetch("http://localhost:5100/api/chess/code/qr");
      if (!qrResponse.ok) {
        throw new Error(`HTTP error! status: ${qrResponse.status}`);
      }
      const qrData = await qrResponse.json();
      
      // Fetch statistics
      const statResponse = await fetch("http://localhost:5100/api/chess/statistic");
      if (!statResponse.ok) {
        throw new Error(`HTTP error! status: ${statResponse.status}`);
      }
      const statData = await statResponse.json();
      
      if (qrData.isSuccess && qrData.data) {
        setQrData({
          registerCode: qrData.data.registerCode,
          donationCode: qrData.data.donationCode
        });
      } else {
        throw new Error(qrData.message || "Failed to fetch QR codes");
      }
      
      if (statData.isSuccess && statData.data) {
        setStatisticData({
          maxRegister: statData.data.maxRegister,
          currentRegistered: statData.data.currentRegistered,
          isFull: statData.data.isFull,
          totalDonationAmount: statData.data.totalDonationAmount || 0
        });
      } else {
        throw new Error(statData.message || "Failed to fetch statistics");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQRCodes();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
          <p className="text-white/80">Đang tải thông tin đăng ký...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <Card className="bg-gradient-to-br from-red-900/50 to-red-800/50 backdrop-blur-sm border-red-500/30 text-white">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
            <h3 className="text-lg font-semibold mb-2">Lỗi tải thông tin</h3>
            <p className="text-red-200 mb-4">{error}</p>
            <button
              onClick={fetchQRCodes}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Thử lại
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!qrData || !statisticData) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-white/60">Không có dữ liệu</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Section */}
      <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-sm border border-indigo-500/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Users className="w-5 h-5 text-indigo-400" />
          <span className="text-white font-semibold">Thông tin đăng ký</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-indigo-800/30 rounded-lg p-3">
            <div className="text-2xl font-bold text-indigo-300">{statisticData.maxRegister}</div>
            <div className="text-sm text-white/70">Tổng suất</div>
          </div>
          <div className="bg-purple-800/30 rounded-lg p-3">
            <div className="text-2xl font-bold text-purple-300">{statisticData.currentRegistered}</div>
            <div className="text-sm text-white/70">Đã đăng ký</div>
          </div>
          <div className="bg-green-800/30 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-300">{statisticData ? statisticData.maxRegister - statisticData.currentRegistered : 0}</div>
            <div className="text-sm text-white/70">Còn lại</div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <Badge className={`${statisticData.isFull 
            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
            : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
          } border-0`}>
            {statisticData.isFull ? 'Đã đầy' : 'Còn chỗ'}
          </Badge>
        </div>
      </div>

      <div className="text-center mb-8">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Đăng ký tham gia
        </h3>
        <p className="text-white/80 text-sm sm:text-base">
          Quét mã QR để đăng ký hoặc ủng hộ giải đấu
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Registration QR Code */}
        <Card className={`bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-sm border-indigo-500/30 text-white hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/25 ${statisticData.isFull ? 'opacity-60' : ''}`}>
          <CardHeader className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-lg sm:text-xl">
              Đăng ký tham gia
            </CardTitle>
            <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 mx-auto">
              Lệ phí: $50,000
            </Badge>
          </CardHeader>
          <CardContent className="text-center">
            <div className="bg-white p-4 rounded-lg mb-4 inline-block">
              <QRCodeSVG
                value={qrData.registerCode}
                size={160}
                level="L"
                imageSettings={{
                  src: "/mezon-logo.png",
                  height: 24,
                  width: 24,
                  excavate: true,
                }}
              />
            </div>
            <p className="text-sm text-white/80 mb-2">
              {statisticData.isFull ? 'Giải đấu đã đầy' : 'Quét mã để đăng ký tham gia giải đấu'}
            </p>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-300">
                {statisticData.isFull ? 'Đăng ký đã đóng' : 'Mã hợp lệ đến 19/7/2025'}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Donation QR Code */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm border-purple-500/30 text-white hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25">
          <CardHeader className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-lg sm:text-xl">
              Ủng hộ giải đấu
            </CardTitle>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 mx-auto">
              Tự nguyện
            </Badge>
          </CardHeader>
          <CardContent className="text-center">
            <div className="bg-white p-4 rounded-lg mb-4 inline-block">
              <QRCodeSVG
                value={qrData.donationCode}
                size={160}
                level="L"
                imageSettings={{
                  src: "/mezon-logo.png",
                  height: 24,
                  width: 24,
                  excavate: true,
                }}
              />
            </div>
            <p className="text-sm text-white/80 mb-2">
              Quét mã để ủng hộ tổ chức giải đấu
            </p>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-300">
                Đã ủng hộ: ${statisticData.totalDonationAmount.toLocaleString('vi-VN')}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <p className="text-xs sm:text-sm text-white/60 mb-2">
          {statisticData.isFull 
            ? 'Giải đấu đã đầy - Không thể đăng ký thêm' 
            : `Còn lại ${statisticData ? statisticData.maxRegister - statisticData.currentRegistered : 0} suất đăng ký`
          }
        </p>
        <p className="text-xs text-white/50">
          Thông tin cập nhật tự động từ hệ thống
        </p>
      </div>
    </div>
  );
}
