import React from "react";

import { Link } from "react-router-dom";



function PrivacyPolicy() {
    return (
    <div className="ppc">
        <div className="backtoprev">
        <Link to={'/wallet'}  className="av" style={{fontSize:"20px"}}> 
           {/* <i className=" fas fa-mask" /> */}
            Back
          </Link>
        </div>
      
      <div>
        <h2 style={{color:"red"}}>Privacy Policy for Meflex Wallet.</h2> 
        <br />
        <br />
        <br />
        <p>
        Meflex Wallet is committed to protecting your privacy. <br />This Privacy Policy
        describes how we collect, use, and disclose information when you use our
        wallet. 
        </p>
        <h2> Collection Of Information. </h2>
        <p> We do not collect any sensitive
        information about you. <br /> We do not ask for your name, email, phone number,
        or any other personal information. We do not track any of your online
        activities. 
        </p>
        <h2>Use of Information </h2>
        Since we do not collect any sensitive
        information, we do not use any information about you.<br /> We do not send you
        any marketing messages or promotional offers. 
        <h2>Disclosure of Information   </h2> 
        <p>
        We do not share any information about you with any third
        party.<br /> We do not sell, rent, or lease any information about you
        </p>
        <h2>Security</h2> 
        <p>We take the security of your information very seriously. Our
        wallet is designed to protect your digital assets,<br /> and we implement best
        practices in security to keep your assets safe.
        </p>
         <h2>Updates To The</h2> 
        <p>Privacy Policy We may update this Privacy Policy from time to time.<br /> We
        will notify you of any changes by posting the new Privacy Policy on our
        website.<br /> You are advised to review this Privacy Policy periodically for
        any changes. 
        </p>
        <h2>Contact Us</h2>

        <p>If you have any queries, please contact us at: <br/>
                <a>Info@meflex.io</a>
                </p>
     </div>
    </div>
  );
}

export default PrivacyPolicy;
