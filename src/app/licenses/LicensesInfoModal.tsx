"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Icons } from "../../components/ui/Icons";

export default function LicensesInfoModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modalRef = useRef<null | HTMLDialogElement>(null);
  const showModal = searchParams.get("showLicenseInfoModal");
  const leaseType = searchParams.get("leaseType");

  useEffect(() => {
    if (showModal === "y") {
      modalRef.current?.showModal();
      document.body.classList.add("overflow-y-hidden");
    } else {
      modalRef.current?.close();
    }

    document.onkeydown = function (e) {
      if (e.key === "Escape") {
        router.replace("/#licenses-section");
        document.body.classList.remove("overflow-y-hidden");
      }
    };
  }, [router, showModal]);

  const closeModal = () => {
    modalRef.current?.close();
    document.body.classList.remove("overflow-y-hidden");
  };

  const modal: JSX.Element | null =
    showModal === "y" ? (
      <dialog
        className="w-3/4 h-3/4 bg-[#080808] backdrop:bg-black backdrop:opacity-60 text-white px-4"
        ref={modalRef}
      >
        <div className="flex flex-col justify-center">
          <div className="flex flex-row justify-between items-center sticky -top-1 pt-2 pb-6 bg-[#080808] border-b-2 border-[#8A0303]">
            <h1 className="text-[1rem] sm:text-2xl font-bold">
              License agreement draft
            </h1>
            <Link
              href="/#licenses-section"
              className="h-[25px] sm:h-[35px]"
              onClick={closeModal}
            >
              <Icons.close />
            </Link>
          </div>
          <div className="flex flex-col space-y-4 font-light text-[0.9rem] sm:text-lg">
            <div className="flex flex-col font-semibold">
              <p>License Agreement</p>
              {leaseType == "Standard Lease" && <p>(NON-EXCLUSIVE RIGHTS)</p>}
              {leaseType == "Deluxe Lease" && <p>(NON-EXCLUSIVE RIGHTS)</p>}
              {leaseType == "Exclusive Lease" && <p>(EXCLUSIVE RIGHTS)</p>}
              <p>Sound Recording/BEATS</p>
            </div>
            <p>
              <span className="font-bold">THIS LICENCE AGREEMENT</span> is made
              on Friday 1st of December 2023 ("Effective Date") by and between{" "}
              <span className="font-bold">NAME</span> (hereinafter referred to
              as the "Licensee") also, if applicable, professionally known as
              <span className="font-bold"> ARTIST NAME</span>, whose principle
              address is <span className="font-bold">ADDRESS</span>, and xGnarly
              (hereinafter referred to as the "Licensor") also, if applicable,
              professionally known as xGnarly, whose principle address is State
              of Podlaskie, Poland. Licensor warrants that it controls the
              mechanical rights in and to the copyrighted musical works entitled
              Beat name ("Composition") as of and prior to the date first
              written above. The Composition, including the music thereof, was
              composed by xGnarly ("Songwriter") managed under the Licensor.
            </p>
            <p>
              <span className="font-bold">Master Use.</span> The Licensor hereby
              grants to License
              {leaseType == "Standard Lease" && " a non-exclusive "}
              {leaseType == "Deluxe Lease" && " a non-exclusive "}
              {leaseType == "Exclusive Lease" && " an exclusive "}
              license (this "License") to record vocal synchronization to the
              Composition partly or in its entirety and substantially in its
              original form ("Master Recording").
            </p>
            <p>
              <span className="font-bold">Mechanical Rights.</span> The Licensor
              hereby grants to Licensee
              {leaseType == "Standard Lease" && " a non-exclusive "}
              {leaseType == "Deluxe Lease" && " a non-exclusive "}
              {leaseType == "Exclusive Lease" && " an exclusive "}
              license to use Master Recording in the reproduction, duplication,
              manufacture, and distribution of phonograph records, cassette
              tapes, compact disk, digital downloads, other miscellaneous audio
              and digital recordings, and any lifts and versions thereof
              (collectively, the "Recordings", and individually, a "Recordings")
              worldwide for
              {leaseType == "Standard Lease" &&
                " up to the pressing or selling a total of" && (
                  <span className="font-bold"> 2500 </span>
                )}
              {leaseType == "Deluxe Lease" &&
                " up to the pressing or selling a total of" && (
                  <span className="font-bold"> UNLIMITED </span>
                )}
              {leaseType == "Exclusive Lease" && (
                <span className="font-bold"> UNLIMITED </span>
              )}
              copies of such Recordings or any combination of such Recordings,
              condition upon the payment to the Licensor a sum of
              {leaseType == "Standard Lease" && (
                <>
                  <span className="font-bold"> $10.00 </span>US dollars
                </>
              )}
              {leaseType == "Deluxe Lease" && (
                <>
                  <span className="font-bold"> $20.00 </span>US dollars
                </>
              )}
              {leaseType == "Exclusive Lease" && (
                <span className="font-bold"> VARIES</span>
              )}
              , receipt of which is confirmed.
            </p>
            <p>
              <span className="font-bold">Performance Rights.</span> The
              Licensor here by grants to Licensee
              {leaseType == "Standard Lease" && " a non-exclusive "}
              {leaseType == "Deluxe Lease" && " a non-exclusive "}
              {leaseType == "Exclusive Lease" && " an exclusive "}
              license to use the Master Recording in unlimited
              {leaseType == "Standard Lease" && " non-profit "}
              {leaseType == "Deluxe Lease" && " non-profit "}
              {leaseType == "Exclusive Lease" && " for-profit "}
              performances, shows, or concerts.
              {leaseType == "Standard Lease" &&
                " Licensee may not receive compensation from performances with this license. "}
              {leaseType == "Deluxe Lease" &&
                " Licensee may not receive compensation from performances with this license. "}
            </p>
            {leaseType == "Standard Lease" && (
              <p>
                <span className="font-bold">Synchronization Rights.</span> The
                Licensor hereby grants limited synchronization rights for one
                (1) music video streamed online (Youtube, Vimeo, etc..) for up
                to <span className="font-bold">500,000</span> streams total on
                all websites. A separate synchronization license will need to be
                purchased for distribution of video to Television, Film or Video
                game.
              </p>
            )}
            {leaseType == "Deluxe Lease" && (
              <p>
                <span className="font-bold">Synchronization Rights.</span> The
                Licensor hereby grants limited synchronization rights for one
                (1) music video streamed online (Youtube, Vimeo, etc..) for up
                to <span className="font-bold">UNLIMITED</span> streams total on
                all websites. A separate synchronization license will need to be
                purchased for distribution of video to Television, Film or Video
                game.
              </p>
            )}
            <p>
              <span className="font-bold">Broadcast Rights.</span> The Licensor
              hereby grants to Licensee
              {leaseType == "Standard Lease" &&
                " a non-exclusive license to broadcast or air the Master Recording in two (2) radio stations through two (2) station channels, respectively. The Licensee shall not be permitted to receive compensation for such broadcasting. "}
              {leaseType == "Deluxe Lease" &&
                " broadcasting rights up to Unlimited Radio Stations. "}
              {leaseType == "Exclusive Lease" &&
                " an exclusive licence to broadcast or air the Master Recording in unlimited amounts of radio stations. "}
            </p>
            <p>
              <span className="font-bold">Credit.</span> Licensee shall
              acknowledge the original authorship of the Composition
              appropriately and reasonably in all media and performance formats
              under the name "xGnarly" in writing where possible and vocally
              otherwise.
            </p>
            <p>
              <span className="font-bold">Consideration.</span> In consideration
              for the rights granted under this agreement, Licensee shall pay to
              licensor the sum of
              {leaseType == "Standard Lease" && (
                <>
                  <span className="font-bold"> $10.00 </span>US dollars{" "}
                </>
              )}
              {leaseType == "Deluxe Lease" && (
                <>
                  <span className="font-bold"> $20.00 </span>US dollars
                </>
              )}
              {leaseType == "Exclusive Lease" && (
                <span className="font-bold"> VARIES </span>
              )}
              and other good and valuable consideration, payable to "xGnarly",
              receipt of which is hereby acknowledged. If the Licensee fails to
              account to the Licensor, timely complete the payments provided for
              hereunder, or perform its other obligations hereunder, including
              having insufficient bank balance, the licensor shall have the
              right to terminate License upon written notice to the Licensee.
              Such termination shall render the recording, manufacture and/or
              distribution of Recordings for which monies have not been paid
              subject to and actionable infringements under applicable law,
              including, without limitation, the United States Copyright Act, as
              amended.
            </p>
            <p>
              <span className="font-bold">Delivery.</span> The Composition shall
              be delivered via email to an email address that Licensee provided
              when making their payment to Licensor. Licensee shall receive an
              email containing an attachment or link from which they can
              download the Composition.
            </p>
            <p>
              <span className="font-bold">Indemnification.</span> Accordingly,
              Licensee agrees to indemnify and hold Licensor harmless from and
              against any and all claims, losses, damages, costs, expenses,
              including, without limitation, reasonable attorney's fees, arising
              of or resulting from a claimed breach of any of Licensee's
              representations, warranties or agreements hereunder.
            </p>
            <p>
              <span className="font-bold">Audio Samples.</span> 3rd party sample
              clearance is the responsibility of the Licensee.
            </p>
            <p>
              <span className="font-bold">Miscellaneous.</span> This license is
              non-transferable and is limited to the Composition specified
              above,{" "}
              {leaseType == "Standard Lease" &&
                "does not convey or grant any right of public performance for profit, "}
              {leaseType == "Deluxe Lease" &&
                "does not convey or grant any right of public performance for profit, "}
              constitutes the entire agreement between the Licensor and the
              Licensee relating to the Composition, and shall be binding upon
              both the Licensor and the Licensee and their respective
              successors, assigns, and legal representatives.
            </p>
            <p>
              <span className="font-bold">Governing Law.</span> This License is
              governed by and shall be construed under the law of the State of
              Podlaskie, Poland, without regard to the conflicts of laws
              principles thereof.
            </p>
            <div className="flex flex-col">
              <p className="font-bold">Publishing.</p>
              <p>Licensee, owns 50% of publishing rights.</p>
              <p> xGnarly, owns 50% of publishing rights.</p>
            </div>

            {leaseType == "Exclusive Lease" && (
              <p>
                Finished audio recording by Licensee of audio release can
                distribute to music supervisors for consideration of
                synchronization licensing. Only the recording artist or
                recording company can monetize with this license. This is not a
                synchronization license for music supervisors of the TV, Film
                and Video game industry.
              </p>
            )}
            <p>
              THE PARTIES HAVE DULY EXECUTED THIS AGREEMENT on the date first
              written above.
            </p>
            <p>
              Licensor: _______________________________________ Date:
              ______________, 20__ xGnarly - Producer Authorized Signing Officer
            </p>
            <p>
              Licensee: _______________________________________
              Date:______________, 20__ Licensee - Artist Authorized Signing
              Officer
            </p>
          </div>
        </div>
      </dialog>
    ) : null;

  return modal;
}
