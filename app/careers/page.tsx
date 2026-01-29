import { Rocket, Heart, Globe, Clock, Laptop, Gift, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "採用情報 | FifthKeys",
  description: "FifthKeys株式会社の採用情報。ホテル業界のDXを一緒に推進する仲間を募集しています。",
};

const positions = [
  {
    title: "フルスタックエンジニア",
    type: "正社員",
    location: "東京 / リモート可",
    description: "Next.js、TypeScript、Pythonを使用したプロダクト開発をリードしていただきます。",
  },
  {
    title: "カスタマーサクセス",
    type: "正社員",
    location: "東京",
    description: "導入施設のオンボーディングから継続的なサポートまで、顧客の成功を支援します。",
  },
  {
    title: "プロダクトマネージャー",
    type: "正社員",
    location: "東京 / リモート可",
    description: "ユーザーリサーチからロードマップ策定まで、プロダクトの成長を牽引します。",
  },
  {
    title: "セールス",
    type: "正社員",
    location: "東京 / 大阪",
    description: "ホテル・旅館への新規開拓営業。業界経験者歓迎。",
  },
];

const benefits = [
  { icon: Clock, title: "フレックスタイム", description: "コアタイム11:00-15:00" },
  { icon: Laptop, title: "リモートワーク", description: "週3日までリモート可" },
  { icon: Gift, title: "充実した福利厚生", description: "社会保険完備、交通費支給" },
  { icon: Globe, title: "グローバル環境", description: "多国籍メンバーが在籍" },
];

export default function CareersPage() {
  return (
    <>
      <Header />
      <main className="bg-cream pt-24">
        {/* Hero */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Rocket className="w-4 h-4" />
              We&apos;re Hiring!
            </div>
            <h1 className="text-4xl lg:text-5xl font-medium text-brown mb-6">
              一緒に、ホテル業界を<br />変えませんか？
            </h1>
            <p className="text-lg text-brown-light max-w-2xl mx-auto">
              FifthKeysは、テクノロジーの力で日本のホテル業界に革新をもたらすスタートアップです。
              情熱を持った仲間を募集しています。
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl lg:text-3xl font-medium text-brown mb-4">
                私たちが大切にしていること
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="font-medium text-brown mb-2">顧客第一</h3>
                <p className="text-sm text-brown-muted">
                  すべての意思決定は「お客様のためになるか」を基準に行います。
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-medium text-brown mb-2">スピード</h3>
                <p className="text-sm text-brown-muted">
                  完璧を待たず、素早く行動し、フィードバックから学びます。
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-medium text-brown mb-2">オープン</h3>
                <p className="text-sm text-brown-muted">
                  情報はオープンに共有し、フラットなコミュニケーションを大切にします。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-medium text-brown mb-8 text-center">
              働く環境
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-brown/10">
                  <benefit.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-medium text-brown mb-1">{benefit.title}</h3>
                  <p className="text-sm text-brown-muted">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-medium text-brown mb-8 text-center">
              募集中のポジション
            </h2>
            <div className="space-y-4">
              {positions.map((position, index) => (
                <a
                  key={index}
                  href="mailto:careers@fifthkeys.com"
                  className="block bg-cream rounded-xl p-6 hover:bg-cream-dark transition-colors group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-brown">{position.title}</h3>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {position.type}
                        </span>
                      </div>
                      <p className="text-sm text-brown-muted mb-1">{position.location}</p>
                      <p className="text-sm text-brown-light">{position.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-brown-muted group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-medium text-brown mb-4">
              ご興味をお持ちですか？
            </h2>
            <p className="text-brown-light mb-8">
              カジュアル面談も歓迎です。お気軽にご連絡ください。
            </p>
            <a
              href="mailto:careers@fifthkeys.com"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-medium transition-colors"
            >
              応募・お問い合わせ
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
