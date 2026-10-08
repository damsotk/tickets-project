'use client';

import { useMyApplication } from '@/app/(hooks)/main-page-hooks/useMyApplication';
import { useWhiteListForm } from '@/app/(hooks)/main-page-hooks/useWhiteListForm';
import { useModal } from '@/app/(hooks)/modal-hooks/use-modal';
import { useModalNavigation } from '@/app/(hooks)/modal-hooks/use-modal-navigation';
import { useTranslation } from '@/app/(hooks)/use-translation';
import styles from '@/app/(styles)/white-list.module.css';
import useUser from '@/contexts/UserContext';
import Link from 'next/link';

export default function WhiteList() {
  const { translate } = useTranslation();
  const translated = translate.modals.whilelistmodal;
  const { user } = useUser();

  const { isOpen, openModal, closeModal } = useModal(false, {
    redirectUrl: '/auth',
    checkAccess: () => !!user,
  });
  const {
    isOpen: isRejectedOpen,
    openModal: openRejectedModal,
    closeModal: closeRejectedModal,
  } = useModal(false);
  const { currentPage, handleNext, resetPage } = useModalNavigation();
  const { application, setApplication, loading } = useMyApplication(!!user);
  const status = application?.status;

  const {
    formData,
    errors,
    isSubmitting,
    submitError,
    handleInputChange,
    resetForm,
    validatePage2,
    validatePage3,
    handleSubmit,
  } = useWhiteListForm();

  const handleClose = () => {
    closeModal();
    resetPage();
    resetForm();
  };

  const handlePage3Next = async () => {
    if (!validatePage3()) return;

    const created = await handleSubmit();
    if (created) {
      setApplication(created);
      handleNext();
    }
  };

  const handleFinalClose = () => {
    closeModal();
    resetPage();
  };

  const handleReapply = () => {
    closeRejectedModal();
    openModal();
  };

  return (
    <>
      {status === 'PENDING' && (
        <div className={`${styles.whitelistButton} ${styles.statusPending}`} role="status">
          <span className={styles.whitelistButtonText}>{translated.card.pending}</span>
        </div>
      )}

      {status === 'APPROVED' && (
        <div className={`${styles.whitelistButton} ${styles.statusApproved}`} role="status">
          <span className={styles.whitelistButtonText}>{translated.card.approved}</span>
        </div>
      )}

      {status === 'REJECTED' && (
        <button
          className={`${styles.whitelistButton} ${styles.statusRejected}`}
          onClick={openRejectedModal}
        >
          <span className={styles.whitelistButtonText}>{translated.card.rejected}</span>
        </button>
      )}

      {!status && (
        <button
          className={styles.whitelistButton}
          onClick={openModal}
          disabled={loading}
          aria-busy={loading}
        >
          <span className={styles.whitelistButtonText}>{translated.card.button}</span>
        </button>
      )}

      {isRejectedOpen && (
        <div className={styles.modalOverlay} onClick={closeRejectedModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{translated.rejectedModal.title}</h2>
              <button onClick={closeRejectedModal} className={styles.closeButton}>
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.page}>
                <div className={styles.rejectedIcon}>✕</div>
                <p className={styles.pageText}>{translated.rejectedModal.text}</p>

                <div className={styles.reasonBlock}>
                  <p className={styles.reasonLabel}>{translated.rejectedModal.reasonLabel}</p>
                  <p className={styles.reasonText}>
                    {application?.reviewComment?.trim() || translated.rejectedModal.noReason}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button onClick={handleReapply} className={styles.nextButton}>
                {translated.rejectedModal.reapplyButton}
              </button>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div className={styles.modalOverlay} onClick={handleClose}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{translated.modal.title}</h2>
              <button onClick={handleClose} className={styles.closeButton}>
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              {currentPage === 1 && (
                <div className={styles.page}>
                  <p className={styles.pageText}>{translated.modal.pages.page1.text}</p>
                </div>
              )}

              {currentPage === 2 && (
                <div className={styles.page}>
                  <p className={styles.hint}>{translated.modal.pages.page2.hint}</p>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>
                      {translated.modal.pages.page2.source.label}
                    </label>
                    <input
                      type="text"
                      className={`${styles.input} ${errors.source ? styles.inputError : ''}`}
                      value={formData.source}
                      onChange={(e) => handleInputChange('source', e.target.value)}
                      placeholder={translated.modal.pages.page2.source.placeholder}
                    />
                    {errors.source && (
                      <span className={styles.errorText}>
                        {translated.modal.validation.required}
                      </span>
                    )}
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>
                      {translated.modal.pages.page2.rpExperience.label}
                    </label>
                    <input
                      type="text"
                      className={`${styles.input} ${errors.rpExperience ? styles.inputError : ''}`}
                      value={formData.rpExperience}
                      onChange={(e) => handleInputChange('rpExperience', e.target.value)}
                      placeholder={translated.modal.pages.page2.rpExperience.placeholder}
                    />
                    {errors.rpExperience && (
                      <span className={styles.errorText}>
                        {translated.modal.validation.required}
                      </span>
                    )}
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>
                      {translated.modal.pages.page2.plans.label}{' '}
                      <span className={styles.optional}>
                        {translated.modal.pages.page2.plans.optional}
                      </span>
                    </label>
                    <textarea
                      className={styles.textarea}
                      value={formData.plans}
                      onChange={(e) => handleInputChange('plans', e.target.value)}
                      placeholder={translated.modal.pages.page2.plans.placeholder}
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {currentPage === 3 && (
                <div className={styles.page}>
                  <div className={styles.almostDoneIcon}>📝</div>
                  <p className={styles.almostDoneText}>
                    {translated.modal.pages.page3.almostDoneText}
                  </p>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>
                      {translated.modal.pages.page3.minecraftNick.label}
                    </label>
                    <input
                      type="text"
                      className={`${styles.input} ${errors.minecraftNick ? styles.inputError : ''}`}
                      value={formData.minecraftNick}
                      onChange={(e) => handleInputChange('minecraftNick', e.target.value)}
                      placeholder={translated.modal.pages.page3.minecraftNick.placeholder}
                      maxLength={16}
                      autoComplete="off"
                      spellCheck={false}
                    />
                    {errors.minecraftNick && (
                      <span className={styles.errorText}>
                        {translated.modal.validation[
                          errors.minecraftNick as keyof typeof translated.modal.validation
                        ] ?? translated.modal.validation.required}
                      </span>
                    )}
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>
                      {translated.modal.pages.page3.discordNick.label}
                    </label>
                    <input
                      type="text"
                      className={`${styles.input} ${errors.discordNick ? styles.inputError : ''}`}
                      value={formData.discordNick}
                      onChange={(e) => handleInputChange('discordNick', e.target.value)}
                      placeholder={translated.modal.pages.page3.discordNick.placeholder}
                      maxLength={32}
                      autoComplete="off"
                      spellCheck={false}
                    />
                    {errors.discordNick && (
                      <span className={styles.errorText}>
                        {translated.modal.validation[
                          errors.discordNick as keyof typeof translated.modal.validation
                        ] ?? translated.modal.validation.required}
                      </span>
                    )}
                  </div>

                  {submitError && <p className={styles.errorText}>{submitError}</p>}
                </div>
              )}

              {currentPage === 4 && (
                <div className={styles.page}>
                  <div className={styles.successIcon}>✓</div>
                  <p className={styles.successText}>{translated.modal.pages.page4.successText}</p>

                  <div className={styles.infoBlock}>
                    <p className={styles.infoText}>{translated.modal.pages.page4.infoText}</p>
                    <Link
                      href="/how-to-play"
                      className={styles.howToPlayLink}
                      onClick={handleFinalClose}
                    >
                      <span className={styles.howToPlayIcon}>📖</span>
                      <span>{translated.modal.pages.page4.howToPlayButton}</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.modalFooter}>
              {currentPage === 1 && (
                <button onClick={() => handleNext()} className={styles.nextButton}>
                  {translated.modal.buttons.next}
                </button>
              )}
              {currentPage === 2 && (
                <button onClick={() => handleNext(validatePage2)} className={styles.nextButton}>
                  {translated.modal.buttons.next}
                </button>
              )}
              {currentPage === 3 && (
                <button
                  onClick={handlePage3Next}
                  className={styles.nextButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '...' : translated.modal.buttons.next}
                </button>
              )}
              {currentPage === 4 && (
                <button onClick={handleFinalClose} className={styles.submitButton}>
                  {translated.modal.buttons.submit}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
