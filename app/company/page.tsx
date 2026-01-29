import { Building2, Users, Target, Calendar, MapPin, Mail, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "会社概要 | FifthKeys",
  description: "FifthKeys株式会社の会社概要。日本のホテル業界のDXを推進するAI搭載ホテルOSを提供しています。",
};

export default function CompanyPage() {
  return (
    <>
      <Header />
      <main className="bg-cream pt-24">
        {/* Hero */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-medium text-brown mb-6">
              会社概要
            </h1>
            <p className="text-lg text-brown-light max-w-2xl mx-auto">
              テクノロジーの力で、日本のホテル業界に革新をもたらします。
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl lg:text-3xl font-medium text-brown mb-4">
                私たちのミッション
              </h2>
              <p className="text-lg text-brown-light max-w-2xl mx-auto leading-relaxed">
                「人手不足」を言い訳にしない、ホテル運営の未来を創る。
                AIとテクノロジーの力で、スタッフが本来の「おもてなし」に集中できる環境を実現します。
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-medium text-brown mb-2">150+</h3>
                <p className="text-sm text-brown-muted">導入施設数</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-medium text-brown mb-2">30名</h3>
                <p className="text-sm text-brown-muted">チームメンバー</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-medium text-brown mb-2">2022年</h3>
                <p className="text-sm text-brown-muted">設立</p>
              </div>
            </div>
          </div>
        </section>

        {/* Company Info Table */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-medium text-brown mb-8 text-center">
              会社情報
            </h2>
            <div className="bg-white rounded-2xl overflow-hidden border border-brown/10">
              <table className="w-full">
                <tbody className="divide-y divide-brown/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-brown bg-cream-dark w-1/3">
                      会社名
                    </th>
                    <td className="px-6 py-4 text-sm text-brown-light">
                      FifthKeys株式会社
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-brown bg-cream-dark">
                      設立
                    </th>
                    <td className="px-6 py-4 text-sm text-brown-light">
                      2022年4月1日
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-brown bg-cream-dark">
                      代表取締役
                    </th>
                    <td className="px-6 py-4 text-sm text-brown-light">
                      田中 太郎
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-brown bg-cream-dark">
                      資本金
                    </th>
                    <td className="px-6 py-4 text-sm text-brown-light">
                      1億円（資本準備金含む）
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-brown bg-cream-dark">
                      従業員数
                    </th>
                    <td className="px-6 py-4 text-sm text-brown-light">
                      30名（2025年1月現在）
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-brown bg-cream-dark">
                      事業内容
                    </th>
                    <td className="px-6 py-4 text-sm text-brown-light">
                      ホテル・旅館向けクラウドシステムの開発・販売・運用
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-brown bg-cream-dark">
                      所在地
                    </th>
                    <td className="px-6 py-4 text-sm text-brown-light">
                      〒100-0005<br />
                      東京都千代田区丸の内1-1-1 パレスビル5F
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-medium text-brown mb-8">
              お問い合わせ
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-8">
              <a href="tel:0120-XXX-XXX" className="flex items-center justify-center gap-3 text-brown hover:text-primary transition-colors">
                <Phone className="w-5 h-5" />
                0120-XXX-XXX
              </a>
              <a href="mailto:info@fifthkeys.com" className="flex items-center justify-center gap-3 text-brown hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
                info@fifthkeys.com
              </a>
              <div className="flex items-center justify-center gap-3 text-brown-light">
                <MapPin className="w-5 h-5" />
                東京都千代田区丸の内
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
