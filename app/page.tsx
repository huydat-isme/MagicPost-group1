import Image from "next/image";
import styles from "@/app/ui/home.module.css";
import Link from "next/link";
import Header from "@/app/header";
export default function Home() {
  return (
    <div>
      {/* nav-bar */}

      
    <Header/>
      {/* end nav-bar */}
      {/* carousel */}
      <div className="carousel w-full relative">
        <div id="slide1" className="carousel-item relative w-full">
          <img src="/emsms.jpg" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src="/ems1ms1.jpg" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img src="/ems2.jpg" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img src="/ems3.jpg" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
      {/* end carousel */}
      {/* card */}
      <div className={styles.lookup_postal}>
        <div className={styles.container_md}>
          <div className={styles.row}>
            <div className="stats stats-vertical lg:stats-horizontal shadow">
              <div className="stat">
                <div className="stat-value">Tra cứu bưu gửi</div>
                <div className="stat-desc">
                  Mã bưu gửi (tra nhiều bill thêm dấu phẩy giữa các bill VD:
                  EB125966888VN, EI125556888VN)
                </div>
                <span>
                  <input
                    type="text"
                    placeholder="Nhập mã đơn hàng ở đây"
                    className="input input-bordered w-full max-w-xs"
                  />
                  <button type="submit" className="btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                    >
                      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                  </button>
                </span>
              </div>
              <div className="stats shadow">
                <div className="stat">
                  <a href="">
                    <div className="stat-value">Ước tính cước phí</div>
                    <div className="stat-desc">
                      <img className="stat-figure" src="/estimate.png" />
                    </div>
                  </a>
                </div>
              </div>
              <div className="stats shadow">
                <div className="stat">
                  <a href="">
                    <div className="stat-value">Tìm kiếm bưu cục</div>
                    <div className="stat-desc">
                      <img className="stat-figure" src="/search-post.png" />
                    </div>
                  </a>
                </div>
              </div>
              <div className="stats shadow">
                <div className="stat">
                  <a href="">
                    <div className="stat-value">Tra hàng cấm gửi</div>
                    <div className="stat-desc">
                      <img
                        className="stat-figure"
                        src="/search-prohibited.png"
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="list-service">
        <h1 className={styles.highlight_service}> Dịch vụ nổi bật </h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="card shadow-lg bg-base-100">
            <div className="card-body">
              <h2 className="card-title">
                <a>MP Tài Liệu</a>{" "}
              </h2>

              <div className="avatar">
                <div className="w-32 rounded">
                  <img src="/ems_tieu_chuan.png" alt="ems tai lieu" />
                </div>
              </div>
              <p>
                EMS Tài liệu là dịch vụ nhận gửi, vận chuyển và phát các loại
                thư, tài liệu trong nước theo chỉ tiêu thời gian tiêu chuẩn được
                Tổng công ty EMS công bố.
              </p>
            </div>
          </div>
          <div className="card shadow-lg bg-base-100">
            <div className="card-body">
              <h2 className="card-title">
                <a>Chuyển phát nhanh MP quốc tế </a>{" "}
              </h2>

              <div className="avatar">
                <div className="w-32 rounded">
                  <img src="/ems_quoc_te.png" alt="mp quoc_te" />
                </div>
              </div>
              <p>
                Chuyển phát nhanh MP Quốc tế là dịch vụ nhận gửi, vận chuyển và
                phát các loại thư, tài liệu, vật phẩm, hàng hoá quốc tế theo chỉ
                tiêu thời gian tiêu chuẩn được Tổng công ty MP công bố.
              </p>
            </div>
          </div>
          <div className="card shadow-lg bg-base-100">
            <div className="card-body">
              <h2 className="card-title">
                <a>MP hỏa tốc</a>{" "}
              </h2>

              <div className="avatar">
                <div className="w-32 rounded">
                  <img src="/ems_hoa_toc.png" alt="ems_hoa_toc" />
                </div>
              </div>
              <p>
                MP Hỏa tốc là là dịch vụ chất lượng cao có chỉ tiêu thời gian
                toàn trình rút ngắn so với dịch vụ MP Tài liệu/Hàng hóa nhanh,
                trong đó bưu gửi được ưu tiên chuyển phát đến người nhận trong
                khung thời gian cam kết theo tuyến hành trình cụ thể.
              </p>
            </div>
          </div>
          <div className="card shadow-lg bg-base-100">
            <div className="card-body">
              <h2 className="card-title">
                <a>MP thương mại điện tử</a>{" "}
              </h2>

              <div className="avatar">
                <div className="w-32 rounded">
                  <img src="/ems_tmdt_nhanh.png" alt="mp tmdt" />
                </div>
              </div>
              <p>
                Dịch vụ MP Thương mại điện tử là dịch vụ chuyển phát cho khách
                hàng Thương mại điện tử (TMĐT) và thực hiện thu hộ/không thu hộ
                một khoản tiền theo yêu cầu để hoàn thành hoạt động giao dịch
                mua bán trực tuyến.
              </p>
            </div>
          </div>
        </div>
        <a className="see_another_service">Các dịch vụ khác</a>
      </div>
    </div>
  );
}
