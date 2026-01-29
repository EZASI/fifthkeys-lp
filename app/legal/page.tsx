import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "特定商取引法に基づく表記 | FifthKeys",
  description: "FifthKeys株式会社の特定商取引法に基づく表記。",
};

export default function LegalPage() {
  return (
    <>
      <Header />
      <main className="bg-cream pt-24">
        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h1 className="text-3xl lg:text-4xl font-medium text-brown mb-8 text-center">
              特定商取引法に基づく表記
            </h1>
            <p className="text-sm text-brown-muted text-center mb-12">
              最終更新日：2025年1月1日
            </p>

            <div className="bg-white rounded-2xl overflow-hidden border border-brown/10">
              <table className="w-full">
                <tbody className="divide-y divide-brown/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-brown bg-cream-dark w-1/3 align-top">
                      販売事業者名
                    </th>
                    <td className="px-6 py-4 text-sm text-brown-light">
                      FifthKeys株式会社
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-brown bg-cream-dark align-top">
                      代表者
                    </th>
                    <td className="px-6 py-4 text-sm text-brown-light">
                      代表取締役 田中 太郎
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-brown bg-cream-dark align-top">
                      所在地
                    </th>
                    <td className="px-6 py-4 text-sm text-brown-light">
                      〒100-0005<br />
                      東京都千代田区丸の内1-1-1 パレスビル5F
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-brown bg-cream-dark align-top">
                      電話番号
                    </th>
                    <td className="px-6 py-4 text-sm text-brown-light">
                      0120-XXX-XXX<br />
                      <span className="text-brown-muted text-xs">（受付時間：平日10:00〜18:00）</span>
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-brown bg-cream-dark align-top">
                      メールアドレス
                    </th>
                    <td className="px-6 py-4 text-sm text-brown-light">
                      info@fifthkeys.com
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-brown bg-cream-dark align-top">
                      サービスの販売価格
                    </th>
                    <td className="px-6 py-4 text-sm text-brown-light">
                      各サービスページに記載の料金（税別）に消費税を加えた金額<br />
                      <span className="text-brown-muted text-xs">※詳細は料金ページをご確認ください</span>
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-brown bg-cream-dark align-top">
                      サービス料金以外の<br />必要料金
                    </th>
                    <td className="px-6 py-4 text-sm text-brown-light">
                      インターネット接続料金、通信料金等はお客様のご負担となります
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-brown bg-cream-dark align-top">
                      お支払い方法
                    </th>
                    <td className="px-6 py-4 text-sm text-brown-light">
                      クレジットカード決済（VISA、Mastercard、JCB、American Express）<br />
                      銀行振込
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-brown bg-cream-dark align-top">
                      お支払い時期
                    </th>
                    <td className="px-6 py-4 text-sm text-brown-light">
                      クレジットカード決済：各カード会社の引き落とし日<br />
                      銀行振込：請求書発行後14日以内
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-brown bg-cream-dark align-top">
                      サービスの提供時期
                    </th>
                    <td className="px-6 py-4 text-sm text-brown-light">
                      お申し込み後、アカウント発行完了時より即時ご利用いただけます<br />
                      <span className="text-brown-muted text-xs">（通常1〜3営業日以内）</span>
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-brown bg-cream-dark align-top">
                      返品・キャンセル<br />について
                    </th>
                    <td className="px-6 py-4 text-sm text-brown-light">
                      サービスの性質上、お申し込み後のキャンセル・返金は原則としてお受けできません。<br />
                      ただし、無料プランからのアップグレード後30日以内であれば、無料プランへのダウングレードが可能です。
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-brown bg-cream-dark align-top">
                      解約について
                    </th>
                    <td className="px-6 py-4 text-sm text-brown-light">
                      管理画面より随時解約手続きが可能です。<br />
                      解約後も契約期間終了日までサービスをご利用いただけます。<br />
                      <span className="text-brown-muted text-xs">※年間契約の場合、中途解約による返金はございません</span>
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-brown bg-cream-dark align-top">
                      動作環境
                    </th>
                    <td className="px-6 py-4 text-sm text-brown-light">
                      <span className="font-medium">推奨ブラウザ：</span><br />
                      Google Chrome（最新版）<br />
                      Safari（最新版）<br />
                      Microsoft Edge（最新版）<br />
                      Firefox（最新版）<br /><br />
                      <span className="font-medium">推奨環境：</span><br />
                      安定したインターネット接続環境
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-6 bg-white rounded-xl border border-brown/10">
              <h2 className="font-medium text-brown mb-3">お問い合わせ先</h2>
              <p className="text-sm text-brown-light">
                ご不明な点がございましたら、下記までお問い合わせください。<br /><br />
                FifthKeys株式会社 カスタマーサポート<br />
                メール：support@fifthkeys.com<br />
                電話：0120-XXX-XXX（平日10:00〜18:00）
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
