@@ -1,126 +0,0 @@
"use strict";

/**
 * @property {Object} settings ������ � ����������� �������.
 * @property {string} settings.previewSelector �������� ������� ��� �������� �������.
 * @property {string} settings.openedImageWrapperClass ����� ��� ������� �������� ��������.
 * @property {string} settings.openedImageClass ����� �������� ��������.
 * @property {string} settings.openedImageScreenClass ����� ��� ����� �������� ��������.
 * @property {string} settings.openedImageCloseBtnClass ����� ��� �������� ������ �������.
 * @property {string} settings.openedImageCloseBtnSrc ���� �� �������� ������ �������.
 * @property {string} settings.openedImageNotFoundSrc ���� �� �������� � ������ ����������� ��������.
 */
const gallery = {
  settings: {
    previewSelector: '.mySuperGallery',
    openedImageWrapperClass: 'galleryWrapper',
    openedImageClass: 'galleryWrapper__image',
    openedImageScreenClass: 'galleryWrapper__screen',
    openedImageCloseBtnClass: 'galleryWrapper__close',
    openedImageCloseBtnSrc: 'images/gallery/close.png',
    openedImageNotFoundSrc: 'images/gallery/404.jpg',
  },

  /**
   * �������������� �������, ������ ���������� �������.
   * @param {Object} userSettings ������ �������� ��� �������.
   */
  init(userSettings = {}) {
    // ���������� ���������, ������� ������� ������������ � ���� ���������.
    Object.assign(this.settings, userSettings);

    // ������� �������, ��� ����� ������ �������� � ������ ���������� �� ���� �������,
    // ��� ����� �� ���� ������� ������� ������� containerClickHandler � ����� �������
    // gallery � ��������� ���� ������� MouseEvent, ������� ���������.
    document
      .querySelector(this.settings.previewSelector)
      .addEventListener('click', event => this.containerClickHandler(event));
  },

  /**
   * ���������� ������� ����� ��� �������� ��������.
   * @param {MouseEvent} event ������� ����� �����.
   * @param {HTMLElement} event.target ������� ������, ���� ��� ���������� ����.
   */
  containerClickHandler(event) {
    // ���� ������� ��� �� ��� ���������, �� ������ �� ������, ������ ��������� �������.
    if (event.target.tagName !== 'IMG') {
      return;
    }
    // ��������� �������� � ���������� �� �������� ���� (data-full_image_url ��������).
    // this.openImage(event.target.dataset.full_image_url);
    const image = new Image();
    image.onload = () => this.openImage(event.target.dataset.full_image_url);
    image.onerror = () => this.openImage(this.settings.openedImageNotFoundSrc);
    image.src = event.target.dataset.full_image_url;
  },

  /**
   * ��������� ��������.
   * @param {string} src ������ �� ��������, ������� ���� �������.
   */
  openImage(src) {
    // �������� ��������� ��� �������� ��������, � ��� ������� ��� img � ������ ��� ������ src.
    this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`).src = src;

  },

  /**
   * ���������� ��������� ��� �������� ��������, ���� ������� ����� ���������, ���� ��� ��� ���.
   * @returns {Element}
   */
  getScreenContainer() {
    // �������� ��������� ��� �������� ��������.
    const galleryWrapperElement = document.querySelector(`.${this.settings.openedImageWrapperClass}`);
    // ���� ��������� ��� �������� �������� ���������� - ���������� ���.
    if (galleryWrapperElement) {
      return galleryWrapperElement;
    }

    // ���������� ���������� �� ������ createScreenContainer ���������.
    return this.createScreenContainer();
  },

  /**
   * ������� ��������� ��� �������� ��������.
   * @returns {HTMLElement}
   */
  createScreenContainer() {
    // ������� ��� ���������-������� � ������ ��� �����.
    const galleryWrapperElement = document.createElement('div');
    galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

    // ������� ��������� ��������, ������ ��� ����� � ��������� � ���������-�������.
    const galleryScreenElement = document.createElement('div');
    galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
    galleryWrapperElement.appendChild(galleryScreenElement);

    // ������� �������� ��� ������ �������, ������ �����, src � ��������� �� � ���������-�������.
    const closeImageElement = new Image();
    closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
    closeImageElement.src = this.settings.openedImageCloseBtnSrc;
    closeImageElement.addEventListener('click', () => this.close());
    galleryWrapperElement.appendChild(closeImageElement);

    // ������� ��������, ������� ����� �������, ������ ����� � ��������� �� � ���������-�������.
    const image = new Image();
    image.classList.add(this.settings.openedImageClass);
    galleryWrapperElement.appendChild(image);

    // ��������� ���������-������� � ��� body.
    document.body.appendChild(galleryWrapperElement);

    // ���������� ����������� � body �������, ��� ���������-�������.
    return galleryWrapperElement;
  },

  /**
   * ��������� (�������) ��������� ��� �������� ��������.
   */
  close() {
    document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
  }
};

// �������������� ���� ������� ��� �������� ��������.
window.onload = () => gallery.init({previewSelector: '.galleryPreviewsContainer'});