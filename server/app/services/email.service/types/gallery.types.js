const GALLERY_REQUEST = {
    template: "gallery/gallery_request.html",
    subject: "Thanks for Your Interest in Suarte! We've Received Your Registration Request",
    required: [
        "gallery_name",
    ]
};

const GALLERY_APPROVED = {
    template: "gallery/gallery_approved.html",
    subject: "Welcome to Suarte — Your Gallery has been Approved!",
    required: [
        "gallery_name",
    ]
};

const GALLERY_REJECTED = {
    template: "gallery/gallery_rejected.html",
    subject: "Suarte Gallery Registration - Thank You for Your Interest",
    required: [
        "gallery_name",
        "reason"
    ]
};

module.exports = {
    GALLERY_REQUEST,
    GALLERY_APPROVED,
    GALLERY_REJECTED,
};