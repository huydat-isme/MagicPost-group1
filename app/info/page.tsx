import Header from "@/app/header";
import Footer from "../footer";
import React from 'react';

const Info = () => {
    return(
        
        <div>
        <Header />
        <div className="hero min-h-screen" style={{backgroundImage: 'url(https://e0.pxfuel.com/wallpapers/779/896/desktop-wallpaper-transportation-background.jpg)'}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
        <div className="max-w-2xl">
        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
        <p className="mb-5">Chào mừng bạn đến với Magic Post - Đối tác đáng tin cậy của bạn trong lĩnh vực chuyển phát nhanh và dịch vụ vận chuyển hàng hóa toàn cầu. Chúng tôi tự hào là một trong những doanh nghiệp hàng đầu, 
        cam kết mang đến sự thuận tiện, an toàn và hiệu quả cho mọi nhu cầu vận chuyển của bạn.</p>
        </div>
        </div>
        </div>
        <div>
            <h1 className="m-5 text-5xl font-bold text-center">Dịch vụ tiện lợi</h1>
        </div>
        <div className="flex flex-col w-full lg:flex-row" >
            <div className="grid flex-grow h-48 card bg-base-300 rounded-box place-items-center m-5 p-5">
                <h2 className="text-xl font-bold">Chuyển Phát Nhanh Quốc Tế</h2>
                <p>Với mạng lưới quốc tế rộng lớn, chúng tôi cung cấp dịch vụ chuyển phát nhanh quốc tế với tốc độ và độ tin cậy hàng đầu trong ngành. 
                    Bạn có thể tin tưởng rằng hàng hóa của bạn sẽ đến đích một cách an toàn và nhanh chóng.</p>
            </div>  
            <div className="grid flex-grow h-48 card bg-base-300 rounded-box place-items-center m-5 p-5">
                <h2 className="text-xl font-bold">Theo Dõi Thông Tin Trực Tuyến</h2>
                <p>Với hệ thống theo dõi hàng loạt tiên tiến, bạn có thể dễ dàng theo dõi tình trạng vận chuyển của mỗi gói hàng. 
                    Chúng tôi cam kết cung cấp thông tin chính xác và chi tiết để bạn luôn kiểm soát được mọi quá trình.</p>
            </div>
        </div>
        <div>
            <h1 className="m-5 text-5xl font-bold text-center">Cam kết của chúng tôi</h1>
        </div>
        <div className="flex flex-col w-full lg:flex-row mb-5" >
            <div className="grid flex-grow h-48 card bg-base-300 rounded-box place-items-center m-5 p-5">
                <h2 className="text-xl font-bold">An Toàn và Bảo Mật</h2>
                <p>Chúng tôi đặt an toàn hàng đầu, 
                    đảm bảo rằng mọi gói hàng của bạn được bảo vệ chặt chẽ và không bị tổn thương trong quá trình vận chuyển.</p>
            </div>  
            <div className="grid flex-grow h-48 card bg-base-300 rounded-box place-items-center m-5 p-5">
                <h2 className="text-xl font-bold">Dịch Vụ Khách Hàng 24/7</h2>
                <p>Đội ngũ dịch vụ khách hàng chuyên nghiệp của chúng tôi luôn sẵn sàng hỗ trợ bạn bất cứ lúc nào. 
                    Chúng tôi tạo ra trải nghiệm dịch vụ chăm sóc khách hàng chuyên nghiệp và tận tâm.</p>
            </div>
            <div className="grid flex-grow h-48 card bg-base-300 rounded-box place-items-center m-5 p-5">
                <h2 className="text-xl font-bold">Giá Cả Hợp Lý</h2>
                <p>Magic Post cam kết mang lại giá cả hợp lý và minh bạch. Không có phí ẩn, 
                    và chúng tôi luôn tìm kiếm cách để tối ưu hóa chi phí vận chuyển cho bạn.</p>
            </div>
        </div>
        <Footer />

        </div>
    );
};

export default Info;