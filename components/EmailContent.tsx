import React from "react";

interface EmailContentProps {
	issue: {
		issueCoverPhoto: string;
		issuePDF: string;
	};
}

const EmailContent: React.FC<EmailContentProps> = ({ issue }) => {
	return (
		<div style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
			<h1 style={{ color: "#515151" }}>New Issue Created</h1>
			<p>A new issue has been reported.</p>
			<img
				src={issue.issueCoverPhoto}
				alt="Issue Cover"
				style={{ maxWidth: "100%", height: "auto" }}
			/>
			<p>
				<a
					href={issue.issuePDF}
					style={{
						display: "inline-block",
						padding: "10px 15px",
						backgroundColor: "#91373e",
						color: "white",
						textDecoration: "none",
						borderRadius: "5px",
					}}>
					View PDF
				</a>
			</p>
		</div>
	);
};

export default EmailContent;
