import React, { useState, useMemo, useRef, useEffect } from "react";
import UploadImgStyled from "./UploadImgStyled";

export default React.memo((props) => {
  //页面展示图片用数组
  const [imgList, setImgList] = useState([]);
  const [imgInput, setImgInput] = useState(null);

  const inputRef = useRef();
  useMemo(() => {
    setImgInput("");
  }, [imgList]);

  const handleInputChange = (e, value) => {
    setImgInput(value);
    const canUploadImgArray = [...e];
    let imageList = [];
    let promiseAry = [];
    canUploadImgArray.map((img, index) => {
      const p = new Promise((resolve, reject) => {
        //用于展示图片效果的一些在线图片
        const imgMap = [
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fy0.ifengimg.com%2F718ad6ec0982b183%2F2014%2F0616%2Fori_539e7d4f65d46.jpeg&refer=http%3A%2F%2Fy0.ifengimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669270747&t=99d11d58cdad8a101c17af5432bef311",
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwximg1.artimg.net%2Fnews%2F201302%2F2013022011414131115.jpg&refer=http%3A%2F%2Fwximg1.artimg.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669270747&t=2a30f88adf5cb328301c0999ac64ec8c",
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.3kr.com%2Fd%2Ffile%2Flishi%2F20170819%2F860fa49d9d6611fdb154af3eed6fa852.jpg&refer=http%3A%2F%2Fimg.3kr.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669270747&t=d77596a5a2b22e7cb34f7c63b12e2b25",
        ];
        setTimeout(() => {
          const url = imgMap[index];
          if (url) {
            resolve({ url });
          } else {
            reject({
              error: "出错了",
            });
          }
        }, 1000);
      }).then(
        (data) => {
          const imgUrl = data.url;
          imageList.push({
            imgUrl,
            status: "unrecognized",
          });
        },
        (error) => {
          console.log(error);
        }
      );
      promiseAry.push(p);
    });
    Promise.all(promiseAry).then(() => {
      setImgList([...imgList, ...imageList]);
    });
  };
  const onDelete = (index) => {
    const newImages = [...imgList];
    newImages.splice(index, 1);
    setImgList(newImages);
  };
  useEffect(() => {
    //需要识别的图片数组
    console.log("imgList", imgList);
    const needRecognizeImgList = imgList.filter(
      (i) => i.status === "unrecognized"
    );
    if (needRecognizeImgList.length > 0) {
      //识别成功的图片
      const recognizeSuccessImgList = [];
      //识别失败
      const recognizeFailImgList = [];
      const promiseAry = [];
      needRecognizeImgList.map((item, index) => {
        const p = new Promise((resolve, reject) => {
          setTimeout(() => {
            if (index < 2) {
              resolve({ name: "jack" });
            } else {
              reject({
                error: "出错了",
              });
            }
          }, 1000);
        }).then(
          (data) => {
            recognizeSuccessImgList.push({
              ...item,
              status: "success",
              name: data.name,
            });
          },
          (error) => {
            console.log("error", error);
            recognizeFailImgList.push({
              ...item,
              status: "fail",
              error: error.error,
            });
          }
        );
        promiseAry.push(p);
      });
      Promise.all(promiseAry).then(() => {
        const updateImgList = imgList.map((i) => {
          const imgUrl = i.imgUrl;
          const updateItem =
            recognizeSuccessImgList.find((i) => i.imgUrl === imgUrl) ||
            recognizeFailImgList.find((i) => i.imgUrl === imgUrl);
          return updateItem ? updateItem : i;
        });
        setImgList(updateImgList);
        console.log("updateImgList", updateImgList);
      });
    }
  }, [imgList]);
  return (
    <UploadImgStyled>
      {imgList?.map((item) => {
        return (
          <div className="imgItem" key={item.imgUrl}>
            <div
              className="close"
              onClick={() => {
                const index = imgList.indexOf(item);
                onDelete(index);
              }}
            >
              <svg
                className="closeIcon"
                style={{ width: "24px", height: "24px" }}
              >
                <use xlinkHref="#close"></use>
              </svg>
            </div>
            {item.status === "unrecognized" && <div>识别中</div>}
            {item.status === "fail" && <div>{item.error}</div>}
            {item.status === "success" && (
              <>
                <div className="img">
                  <img alt="" src={item.imgUrl} />
                </div>
                <div>{item.name}</div>
              </>
            )}
          </div>
        );
      })}
      <div className="input">
        <svg className="addPictureIcon">
          <use xlinkHref="#addPhoto"></use>
        </svg>
        <input
          ref={inputRef}
          value={imgInput}
          type="file"
          // accept="image/png"
          multiple
          onChange={(e) => {
            handleInputChange(e.target.files, e.target.value);
          }}
        />
      </div>
    </UploadImgStyled>
  );
});
