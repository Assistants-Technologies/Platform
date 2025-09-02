import {
  CreditCardIcon,
  CurrencyDollarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function BillingPage() {
  return (
    <div className="space-y-8">
      {/* Payment Methods */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6 flex items-center">
          <CreditCardIcon className="w-5 h-5 mr-2" />
          Payment Methods
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://img.icons8.com/color/48/000000/visa.png"
                alt="Visa"
                className="w-10 h-10"
              />
              <div>
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-sm text-gray-500">Expires 12/2026</p>
              </div>
            </div>
            <button className="text-sm text-red-600 hover:underline font-medium">
              Remove
            </button>
          </div>

          <button className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-900 transition">
            + Add Payment Method
          </button>
        </div>
      </section>

      {/* Subscriptions */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6 flex items-center">
          <CurrencyDollarIcon className="w-5 h-5 mr-2" />
          Subscriptions
        </h2>

        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">Pro Plan</p>
              <p className="text-sm text-gray-500">
                $12 / month – Next billing: 01 Oct 2025
              </p>
            </div>
            <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-200 transition">
              Manage
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">AI Add-on</p>
              <p className="text-sm text-gray-500">
                $5 / month – Next billing: 01 Oct 2025
              </p>
            </div>
            <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-200 transition">
              Manage
            </button>
          </div>
        </div>
      </section>

      {/* Billing History */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6 flex items-center">
          <ClockIcon className="w-5 h-5 mr-2" />
          Billing History
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600">
                <th className="px-4 py-2 font-medium">Date</th>
                <th className="px-4 py-2 font-medium">Description</th>
                <th className="px-4 py-2 font-medium">Amount</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-2">01 Sep 2025</td>
                <td className="px-4 py-2">Pro Plan – Monthly</td>
                <td className="px-4 py-2">$12.00</td>
                <td className="px-4 py-2 text-green-600 font-medium">Paid</td>
                <td className="px-4 py-2">
                  <button className="text-sm text-blue-600 hover:underline font-medium">
                    Download Invoice
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-2">01 Aug 2025</td>
                <td className="px-4 py-2">Pro Plan – Monthly</td>
                <td className="px-4 py-2">$12.00</td>
                <td className="px-4 py-2 text-green-600 font-medium">Paid</td>
                <td className="px-4 py-2">
                  <button className="text-sm text-blue-600 hover:underline font-medium">
                    Download Invoice
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">01 Jul 2025</td>
                <td className="px-4 py-2">Pro Plan – Monthly</td>
                <td className="px-4 py-2">$12.00</td>
                <td className="px-4 py-2 text-green-600 font-medium">Paid</td>
                <td className="px-4 py-2">
                  <button className="text-sm text-blue-600 hover:underline font-medium">
                    Download Invoice
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
