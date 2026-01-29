import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "プライバシーポリシー | FifthKeys",
  description: "FifthKeys株式会社のプライバシーポリシー（個人情報保護方針）。個人情報の取り扱いについて。",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-cream pt-24">
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h1 className="text-3xl lg:text-4xl font-medium text-brown mb-4 text-center">
              プライバシーポリシー
            </h1>
            <p className="text-sm text-brown-muted text-center mb-12">
              最終更新日：2025年1月1日　施行日：2025年1月1日
            </p>

            <div className="bg-white rounded-2xl p-8 lg:p-12 border border-brown/10">
              <div className="prose prose-brown max-w-none text-sm leading-relaxed">
                <p className="text-brown-light mb-8">
                  FifthKeys株式会社（以下「当社」といいます）は、当社が提供するサービス「FifthKeys」（以下「本サービス」といいます）における、お客様の個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定めます。当社は、個人情報の保護に関する法律（以下「個人情報保護法」といいます）その他の関連法令及びガイドラインを遵守し、お客様の個人情報を適切に取り扱います。
                </p>

                <h2 className="text-lg font-medium text-brown mt-10 mb-4">第1条（個人情報の定義）</h2>
                <p className="text-brown-light">
                  本ポリシーにおいて「個人情報」とは、個人情報保護法第2条第1項に定める個人情報をいい、生存する個人に関する情報であって、次の各号のいずれかに該当するものをいいます。
                </p>
                <ol className="list-decimal pl-6 text-brown-light space-y-2 mt-4">
                  <li>当該情報に含まれる氏名、生年月日その他の記述等（文書、図画若しくは電磁的記録に記載され、若しくは記録され、又は音声、動作その他の方法を用いて表された一切の事項をいいます）により特定の個人を識別することができるもの（他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるものを含みます）</li>
                  <li>個人識別符号が含まれるもの</li>
                </ol>

                <h2 className="text-lg font-medium text-brown mt-10 mb-4">第2条（個人情報の収集方法）</h2>
                <p className="text-brown-light">当社は、以下の方法により個人情報を取得します。</p>
                <ol className="list-decimal pl-6 text-brown-light space-y-2 mt-4">
                  <li>本サービスの利用登録時にお客様から直接ご提供いただく方法</li>
                  <li>本サービスのお問い合わせフォーム、資料請求フォーム、デモ予約フォーム等を通じてご提供いただく方法</li>
                  <li>本サービスの利用に伴い自動的に取得する方法（Cookie、アクセスログ等）</li>
                  <li>お客様が本サービスを通じて入力又は送信する情報</li>
                  <li>当社の提携先（外部サービスとの連携を含みます）から適法に取得する方法</li>
                </ol>

                <h2 className="text-lg font-medium text-brown mt-10 mb-4">第3条（収集する個人情報の項目）</h2>
                <p className="text-brown-light">当社が収集する個人情報の項目は以下のとおりです。</p>
                <ol className="list-decimal pl-6 text-brown-light space-y-2 mt-4">
                  <li>氏名、会社名、部署名、役職</li>
                  <li>メールアドレス、電話番号、住所</li>
                  <li>本サービスのアカウント情報（ユーザーID、パスワード等）</li>
                  <li>本サービスの利用履歴、操作ログ</li>
                  <li>お客様が本サービスに入力した宿泊施設情報、予約情報、顧客情報</li>
                  <li>クレジットカード情報等の決済情報（決済代行会社を通じて処理されます）</li>
                  <li>IPアドレス、Cookie情報、端末情報、ブラウザ情報</li>
                  <li>当社とのやり取りの記録（お問い合わせ内容、通話記録等）</li>
                </ol>

                <h2 className="text-lg font-medium text-brown mt-10 mb-4">第4条（個人情報の利用目的）</h2>
                <p className="text-brown-light">当社は、取得した個人情報を以下の目的で利用します。</p>
                <ol className="list-decimal pl-6 text-brown-light space-y-2 mt-4">
                  <li>本サービスの提供、運営、維持及び改善</li>
                  <li>本サービスに関するお客様からのお問い合わせへの対応</li>
                  <li>本サービスの利用料金の請求及び決済処理</li>
                  <li>本サービスに関する重要なお知らせ（メンテナンス情報、利用規約の変更等）の通知</li>
                  <li>本サービス及び当社の他のサービスに関するマーケティング活動（お客様の同意がある場合）</li>
                  <li>本サービスの利用状況の分析及び統計データの作成（個人を特定できない形式に加工した上で利用します）</li>
                  <li>新機能、新サービスの開発及び研究</li>
                  <li>不正利用の防止及び利用規約に違反するお客様への対応</li>
                  <li>法令に基づく対応及び当社の権利、財産又はサービスの保護</li>
                  <li>その他上記各号に付随する目的</li>
                </ol>

                <h2 className="text-lg font-medium text-brown mt-10 mb-4">第5条（個人情報の第三者提供）</h2>
                <ol className="list-decimal pl-6 text-brown-light space-y-2">
                  <li>当社は、次に掲げる場合を除き、あらかじめお客様の同意を得ることなく、個人情報を第三者に提供することはありません。
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>法令に基づく場合</li>
                      <li>人の生命、身体又は財産の保護のために必要がある場合であって、お客様の同意を得ることが困難であるとき</li>
                      <li>公衆衛生の向上又は児童の健全な育成の推進のために特に必要がある場合であって、お客様の同意を得ることが困難であるとき</li>
                      <li>国の機関若しくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、お客様の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
                    </ul>
                  </li>
                  <li>前項の規定にかかわらず、以下の場合は第三者への提供には該当しないものとします。
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>当社が利用目的の達成に必要な範囲内において個人情報の取扱いの全部又は一部を委託する場合</li>
                      <li>合併その他の事由による事業の承継に伴って個人情報が提供される場合</li>
                    </ul>
                  </li>
                </ol>

                <h2 className="text-lg font-medium text-brown mt-10 mb-4">第6条（個人情報の委託）</h2>
                <p className="text-brown-light">
                  当社は、利用目的の達成に必要な範囲内において、個人情報の取扱いの全部又は一部を第三者に委託することがあります。この場合、当社は、委託先との間で個人情報の取扱いに関する契約を締結し、委託先における個人情報の安全管理が図られるよう、必要かつ適切な監督を行います。
                </p>

                <h2 className="text-lg font-medium text-brown mt-10 mb-4">第7条（個人情報の安全管理措置）</h2>
                <p className="text-brown-light">当社は、個人情報の漏えい、滅失又はき損の防止その他の個人情報の安全管理のために、以下の措置を講じます。</p>
                <ol className="list-decimal pl-6 text-brown-light space-y-2 mt-4">
                  <li><strong className="text-brown">組織的安全管理措置</strong>：個人情報保護管理者の設置、個人情報の取扱いに関する規程の整備、取扱状況の把握及び安全管理措置の見直し</li>
                  <li><strong className="text-brown">人的安全管理措置</strong>：従業者への定期的な研修の実施、秘密保持に関する事項の就業規則への記載</li>
                  <li><strong className="text-brown">物理的安全管理措置</strong>：個人情報を取り扱う区域の管理、機器及び電子媒体等の盗難等の防止、電子媒体等を持ち運ぶ場合の漏えい等の防止</li>
                  <li><strong className="text-brown">技術的安全管理措置</strong>：アクセス制御、アクセス者の識別と認証、外部からの不正アクセス等の防止、情報システムの使用に伴う漏えい等の防止</li>
                </ol>

                <h2 className="text-lg font-medium text-brown mt-10 mb-4">第8条（Cookie及びアクセス解析ツールの使用）</h2>
                <ol className="list-decimal pl-6 text-brown-light space-y-2">
                  <li>当社は、本サービス及び当社ウェブサイトにおいて、Cookie及び類似の技術を使用しています。Cookieとは、ウェブサイトがお客様のコンピュータ又はモバイル端末のブラウザに送信する小さなテキストファイルです。</li>
                  <li>当社は、以下の目的でCookieを使用します。
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>お客様の認証状態の維持</li>
                      <li>お客様の設定情報の保存</li>
                      <li>本サービスの利用状況の分析及び改善</li>
                      <li>広告の効果測定及び最適化</li>
                    </ul>
                  </li>
                  <li>当社は、以下のアクセス解析ツールを使用してウェブサイトのアクセス状況を分析しています。
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li><strong className="text-brown">Google Analytics</strong>（提供元：Google LLC）：ウェブサイトの利用状況を分析するためのツールです。Cookieを使用してデータを収集しますが、個人を特定する情報は含まれません。詳細はGoogle社のプライバシーポリシーをご確認ください。</li>
                      <li><strong className="text-brown">Microsoft Clarity</strong>（提供元：Microsoft Corporation）：ユーザーの行動を分析するためのツールです。セッションの録画やヒートマップ機能を提供しますが、個人を特定する情報は収集しません。</li>
                    </ul>
                  </li>
                  <li>お客様は、ブラウザの設定によりCookieの受け入れを拒否することができます。ただし、Cookieを無効にした場合、本サービスの一部機能をご利用いただけない場合があります。</li>
                </ol>

                <h2 className="text-lg font-medium text-brown mt-10 mb-4">第9条（個人情報の開示、訂正、利用停止等）</h2>
                <ol className="list-decimal pl-6 text-brown-light space-y-2">
                  <li>お客様は、当社に対し、個人情報保護法の定めに基づき、以下の請求を行うことができます。
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>保有個人データの開示の請求</li>
                      <li>保有個人データの内容の訂正、追加又は削除の請求</li>
                      <li>保有個人データの利用の停止又は消去の請求</li>
                      <li>保有個人データの第三者への提供の停止の請求</li>
                    </ul>
                  </li>
                  <li>前項の請求を行う場合は、本ポリシー末尾記載のお問い合わせ窓口までご連絡ください。当社は、お客様ご本人からの請求であることを確認した上で、遅滞なく対応いたします。</li>
                  <li>開示等の請求に際しては、当社所定の手数料をいただく場合があります。</li>
                </ol>

                <h2 className="text-lg font-medium text-brown mt-10 mb-4">第10条（個人情報の保存期間）</h2>
                <p className="text-brown-light">
                  当社は、利用目的の達成に必要な期間、個人情報を保存します。ただし、法令により保存が義務付けられている場合は、当該法令に定める期間、個人情報を保存します。保存期間経過後又は利用目的達成後は、遅滞なく個人情報を削除又は匿名化します。
                </p>

                <h2 className="text-lg font-medium text-brown mt-10 mb-4">第11条（外国にある第三者への提供）</h2>
                <p className="text-brown-light">
                  当社は、本サービスの提供にあたり、お客様の個人情報を外国にある第三者に提供することがあります。この場合、当社は、個人情報保護法に基づき、当該外国の個人情報保護制度に関する情報及び当該第三者が講ずる個人情報の保護のための措置に関する情報をお客様に提供した上で、お客様の同意を取得します。
                </p>

                <h2 className="text-lg font-medium text-brown mt-10 mb-4">第12条（お子様の個人情報）</h2>
                <p className="text-brown-light">
                  本サービスは、事業者向けサービスであり、18歳未満の方を対象としておりません。当社は、18歳未満の方から意図的に個人情報を収集することはありません。18歳未満の方の個人情報が当社に提供されたことが判明した場合、当社は速やかに当該情報を削除します。
                </p>

                <h2 className="text-lg font-medium text-brown mt-10 mb-4">第13条（本ポリシーの変更）</h2>
                <ol className="list-decimal pl-6 text-brown-light space-y-2">
                  <li>当社は、法令の改正、事業内容の変更その他の理由により、本ポリシーを変更することがあります。</li>
                  <li>本ポリシーを変更する場合、変更後の本ポリシーの施行日及び内容を、当社ウェブサイトへの掲載その他適切な方法により、施行日前に周知します。</li>
                  <li>本ポリシーの変更が、お客様の権利に重大な影響を及ぼす場合は、事前にお客様の同意を取得します。</li>
                </ol>

                <h2 className="text-lg font-medium text-brown mt-10 mb-4">第14条（お問い合わせ窓口）</h2>
                <p className="text-brown-light">
                  本ポリシーに関するお問い合わせ、個人情報の開示等の請求、苦情及びご相談は、下記窓口までご連絡ください。
                </p>
                <div className="bg-cream rounded-xl p-6 mt-4">
                  <p className="text-brown font-medium">FifthKeys株式会社　個人情報保護管理者</p>
                  <p className="text-brown-light text-sm mt-2">
                    〒100-0005 東京都千代田区丸の内1-1-1 パレスビル5F<br />
                    メール：privacy@fifthkeys.com<br />
                    電話：0120-XXX-XXX（平日10:00〜18:00）
                  </p>
                </div>

                <div className="mt-12 pt-8 border-t border-brown/10">
                  <p className="text-brown-muted text-xs">
                    2025年1月1日　制定・施行
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
