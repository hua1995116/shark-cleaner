import React, { useState } from 'react';

function bottom() {
  const [isShow, setShow] = useState(false);

  return (
    <div className="bottom">
      created by <a href="https://github.com/hua1995116/shark-cleaner" target="_blank">@hua1995116</a>
      <div className="my-pay">
        <div className="my-pay-btn" onClick={() => setShow(!isShow)}>赞赏</div>
        <div className="my-pay-type clear" style={{ "display": isShow ? 'block' : 'none' }} >
          <div className="my-pay-alipay my-pay-div"></div>
          <div className="my-pay-weixin my-pay-div"></div>
        </div>
      </div>
    </div>
  )
}

export default bottom;