// 共創工学部サイト向けの簡単なインタラクション
// - カードをクリックすると詳細をモーダル風に表示します
// - キーボード操作（Enter / Space）にも対応しています
// 初心者にも分かるように日本語コメントを多めにしています。

document.addEventListener('DOMContentLoaded', () => {
	// カードを押す（クリック or Enter/Space）と詳細を表示する
	const cards = document.querySelectorAll('.card');
	cards.forEach(card => {
		// クリックで詳細表示
		card.addEventListener('click', () => showCardDetail(card));

		// キーボードで操作できるようにEnter/Spaceにも対応（アクセシビリティ）
		card.addEventListener('keydown', (e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				showCardDetail(card);
			}
		});
	});

	// 「詳しく見る」ボタンはフッターへスムーズスクロール
	const contactBtn = document.getElementById('contactBtn');
	if (contactBtn) {
		contactBtn.addEventListener('click', () => {
			const contact = document.getElementById('contact');
			if (contact) contact.scrollIntoView({ behavior: 'smooth' });

				// 追加で簡単な案内を表示（実運用では外部リンクや詳細ページへ誘導します）
				setTimeout(() => {
					alert('オープンキャンパス情報のページに移動する想定です（仮表示）。');
				}, 600);
		});
	}

	// カードの詳細をモーダル風に表示する関数
	function showCardDetail(card) {
		const title = card.querySelector('h3')?.textContent || '詳細';
		const body = card.querySelector('p')?.textContent || '';

		// モーダル用の要素を作る（とてもシンプルな実装）
		const modal = document.createElement('div');
		modal.className = 'simple-modal';

		const inner = document.createElement('div');
		inner.className = 'simple-modal-inner';
		inner.innerHTML = `<h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p><button class="close">閉じる</button>`;

		modal.appendChild(inner);
		document.body.appendChild(modal);

		// フォーカスとイベント処理
		const closeBtn = inner.querySelector('.close');
		closeBtn.focus();
		closeBtn.addEventListener('click', () => modal.remove());
		modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
	}

	// 簡易的なエスケープ（表示用）
	function escapeHtml(text) {
		return String(text)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}
s});

