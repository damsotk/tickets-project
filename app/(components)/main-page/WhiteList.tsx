'use client';

import { useWhiteListForm } from '@/app/(hooks)/main-page-hooks/useWhiteListForm';
import { useModal } from '@/app/(hooks)/modal-hooks/use-modal';
import { useModalNavigation } from '@/app/(hooks)/modal-hooks/use-modal-navigation';
import { useTranslation } from '@/app/(hooks)/use-translation';
import styles from '@/app/(styles)/white-list.module.css';
import useUser from '@/contexts/UserContext';

export default function WhiteList() {
  const { translate } = useTranslation();
  const translated = translate.modals.whilelistmodal;
  const { user } = useUser();

  const { isOpen, openModal, closeModal } = useModal(false, {
    redirectUrl: '/auth',
    checkAccess: () => !!user,
  });
  const { currentPage, handleNext, resetPage } = useModalNavigation();

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

    const success = await handleSubmit();
    if (success) {
      handleNext();
    }
  };

  const handleFinalClose = () => {
    closeModal();
    resetPage();
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🛡️</span>
            <span className={styles.badgeText}>{translated.card.badge}</span>
          </div>

          <p className={styles.description}>{translated.card.description}</p>

          <button onClick={openModal} className={styles.button}>
            <span className={styles.buttonText}>{translated.card.button}</span>
            <span className={styles.buttonIcon}>→</span>
          </button>
        </div>
      </div>

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
                    />
                    {errors.minecraftNick && (
                      <span className={styles.errorText}>
                        {translated.modal.validation.required}
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
                    />
                    {errors.discordNick && (
                      <span className={styles.errorText}>
                        {translated.modal.validation.required}
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

                  <div className={styles.discordInfo}>
                    <p className={styles.discordText}>
                      {translated.modal.pages.page4.discordInfo.text}{' '}
                      <span className={styles.channel}>
                        {translated.modal.pages.page4.discordInfo.channel}
                      </span>
                      {translated.modal.pages.page4.discordInfo.textContinue}
                    </p>
                    <a
                      href="https://discord.gg/U6muwVtSa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.discordLink}
                    >
                      <span className={styles.discordIcon}>💬</span>
                      <span>{translated.modal.pages.page4.discordInfo.linkText}</span>
                    </a>
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
    </div>
  );
}
