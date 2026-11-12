/* One lead record behind all four versions (Home loans A/B, SMSF A/B).
   Today's kienphan.com.au field names come first and keep their names and option
   values; new fields are appended after them, so existing columns never move.

   NOT CONNECTED YET. submit() only keeps the first name for the thank-you page and
   moves on. When these pages are linked to kienphan.com.au, submit() posts the record
   to /api/submit-lead (which then needs the new columns and option values added) and
   fires the Meta Lead event once, here, with page and variant. Never on the thank-you
   page load. Quiz answers are financial-intent data: they never go to Meta. */
(function () {
  "use strict";

  var COLUMNS = [
    // today's fields, unchanged
    "first_name", "last_name", "mobile", "email", "state", "residency_status",
    "enquiry_type", "first_home_buyer", "has_accountant", "message",
    // new, appended
    "page", "variant", "form_type", "consent",
    "stage", "price_band", "deposit_band",
    "smsf_goal", "smsf_setup", "fund_balance", "property_use", "members_working",
    "loan_covers", "amount_owing", "property_value",
    "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"
  ];

  // Values exactly as today's form sends them.
  var PURPOSE = {
    live: "Buying a home to live in",
    invest: "Buying an investment property",
    commercial: "Buying a commercial property",
    refinance: "Refinancing an existing mortgage"
  };
  var FIRST_HOME = { yes: "Yes, this is my first home", no: "No, I’ve bought before" };

  function blankRecord(page, variant, formType) {
    var rec = {};
    COLUMNS.forEach(function (c) { rec[c] = ""; });
    rec.page = page;
    rec.variant = variant;
    rec.form_type = formType;
    var q = new URLSearchParams(window.location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"].forEach(function (k) {
      rec[k] = (q.get(k) || "").slice(0, 256);
    });
    return rec;
  }

  // Australian mobile: 04xx xxx xxx, or +61 4xx xxx xxx.
  function isAuMobile(v) {
    var d = String(v || "").replace(/[\s()-]/g, "");
    return /^(?:\+?61|0)4\d{8}$/.test(d);
  }

  function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v || "").trim());
  }

  function submit(rec, thanksUrl) {
    try {
      sessionStorage.setItem("kp_lead", JSON.stringify({
        first_name: rec.first_name,
        page: rec.page,
        smsf_setup: rec.smsf_setup
      }));
    } catch (e) { /* storage blocked: the thank-you page falls back to a generic line */ }
    window.location.href = thanksUrl;
  }

  window.KPLead = {
    COLUMNS: COLUMNS,
    PURPOSE: PURPOSE,
    FIRST_HOME: FIRST_HOME,
    blankRecord: blankRecord,
    isAuMobile: isAuMobile,
    isEmail: isEmail,
    submit: submit
  };
})();
