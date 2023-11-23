const DRAFT_REQUEST = {
    template: "draft/draft_request.html",
    subject: "Submission Under Review: {{$artwork_title}} by {{$artist_name}}",
    required: [
        "artwork_title",
        "artist_name",
        "gallery_name"
    ]
};

const DRAFT_APPROVED = {
    template: "draft/draft_approved.html",
    subject: "{{$artwork_title}} by {{$artist_name}} is live on Suarte!",
    required: [
        "artwork_title",
        "artist_name",
        "gallery_name"
    ]
};

const DRAFT_CHANGES_REQUIRED = {
    template: "draft/draft_changes_required.html",
    subject: "Submission Update: {{$artwork_title}} by {{$artist_name}} Needs Adjustments",
    required: [
        "artwork_title",
        "artist_name",
        "reason",
        "gallery_name"
    ]
};

module.exports = {
    DRAFT_REQUEST,
    DRAFT_APPROVED,
    DRAFT_CHANGES_REQUIRED,
};