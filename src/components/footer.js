const Footer = () => {
  return (
    <footer class="content-footer footer bg-footer-theme">
      <div class="container-xxl d-flex flex-wrap justify-content-between align-items-center py-2 flex-md-row flex-column">
        <div class="mb-2 mb-md-0">
          Copyright ©<script>document.write(new Date().getFullYear());</script>,
          <a
            href="https://darkor.uz"
            target="_blank"
            class="footer-link fw-bolder"
          >
            Darkor
          </a>
        </div>
        <div>
          <a
            href="https://themeselection.com/documentation"
            target="_blank"
            class="footer-link me-4"
          >
            Documentation
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
