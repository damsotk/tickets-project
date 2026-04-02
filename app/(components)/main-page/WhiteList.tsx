'use client';

import { useWhiteList } from '@/app/(hooks)/main-page-hooks/useWhiteList';
import { useModal } from '@/app/(hooks)/useModal';
import { useRouter } from 'next/navigation';
import styles from '@/app/(styles)/white-list.module.css';
import { useState } from 'react';

export default function WhiteList() {
  const { user } = useWhiteList();
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    source: '',
    rpExperience: '',
    plans: '',
    minecraftNick: '',
    discordNick: '',
  });

  const handleOpenModal = () => {
    if (!user) {
      router.push('/auth');
      return;
    }
    openModal();
  };

  const handleClose = () => {
    closeModal();
    setCurrentPage(1);
    setFormData({
      source: '',
      rpExperience: '',
      plans: '',
      minecraftNick: '',
      discordNick: '',
    });
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Форма отправлена:', formData);
    handleClose();
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🛡️</span>
            <span className={styles.badgeText}>Закрытое сообщество</span>
          </div>

          <p className={styles.description}>
            На нашем сервере действует система вайт-листа. Подайте заявку, чтобы присоединиться к
            нашему закрытому сообществу!
          </p>

          <button onClick={handleOpenModal} className={styles.button}>
            <span className={styles.buttonText}>Подать заявку</span>
            <span className={styles.buttonIcon}>→</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className={styles.modalOverlay} onClick={handleClose}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Заявка в White List</h2>
              <button onClick={handleClose} className={styles.closeButton}>
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              {currentPage === 1 && (
                <div className={styles.page}>
                  <p className={styles.pageText}>
                    Нам нужно задать тебе несколько вопросов, перед тем как пустить на сервер. Мы
                    хотим узнать о тебе побольше, дабы администрации было проще работать с тобой!
                  </p>
                </div>
              )}
              {currentPage === 2 && (
                <div className={styles.page}>
                  <p className={styles.hint}>Постарайтесь отвечать коротко и по существу</p>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Откуда вы узнали о проекте?</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={formData.source}
                      onChange={(e) => handleInputChange('source', e.target.value)}
                      placeholder="Ваш ответ..."
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Имеется ли опыт в РП?</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={formData.rpExperience}
                      onChange={(e) => handleInputChange('rpExperience', e.target.value)}
                      placeholder="Ваш ответ..."
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>
                      Какие планы на игру? <span className={styles.optional}>(необязательно)</span>
                    </label>
                    <textarea
                      className={styles.textarea}
                      value={formData.plans}
                      onChange={(e) => handleInputChange('plans', e.target.value)}
                      placeholder="Ваш ответ..."
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {currentPage === 3 && (
                <div className={styles.page}>
                  <div className={styles.successIcon}>✓</div>
                  <p className={styles.successText}>
                    Успешно! Мы получили ваши ответы, введите свой ник ниже, пожалуйста.
                  </p>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Ваш ник в Minecraft</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={formData.minecraftNick}
                      onChange={(e) => handleInputChange('minecraftNick', e.target.value)}
                      placeholder="Steve"
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Ваш ник в Discord</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={formData.discordNick}
                      onChange={(e) => handleInputChange('discordNick', e.target.value)}
                      placeholder="username#0000"
                    />
                  </div>

                  <div className={styles.discordInfo}>
                    <p className={styles.discordText}>
                      После этого перейдите по ссылке в Discord и прочтите канал{' '}
                      <span className={styles.channel}>#как-играть</span>. Добавят вас в вайтлист в
                      течении 24 часов.
                    </p>
                    <a
                      href="https://discord.gg/your-server"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.discordLink}
                    >
                      <span className={styles.discordIcon}>💬</span>
                      <span>Присоединиться к Discord</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.modalFooter}>
              {currentPage < 3 ? (
                <button onClick={handleNext} className={styles.nextButton}>
                  Далее
                </button>
              ) : (
                <button onClick={handleSubmit} className={styles.submitButton}>
                  Отослать заявку в вайтлист!
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
